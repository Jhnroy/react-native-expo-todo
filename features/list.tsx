"use client";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import axios from "axios";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

export default function ListView() {
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const isGrid = true;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const API_URL = process.env.EXPO_PUBLIC_API_URL + "/todos";
  console.log("API_URL:", API_URL);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL!);
      setTodos(response.data.data);
    } catch (error: any) {
      console.error("Fetch error:", error.message);
      Alert.alert(
        "Error",
        "Failed to fetch tasks. Check your API URL and network.",
      );
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useFocusEffect(
    useCallback(() => {
      fetchTodos();
    }, [fetchTodos]),
  );

  const handleDelete = (docId: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await axios.delete(`${API_URL}/${docId}`);
              setTodos((prev) =>
                prev.filter((item) => item.documentId !== docId),
              );
              Alert.alert("Success", "Task deleted successfully!");
            } catch (error: any) {
              console.error(error);
              Alert.alert("Error", "Failed to delete task");
            } finally {
              setLoading(false);
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isDark ? "#121212" : "#FFF",
        }}
      >
        <ActivityIndicator size="large" color={isDark ? "#fff" : "blue"} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 48,
        paddingBottom: 24,
        backgroundColor: isDark ? "#121212" : "#FFF",
      }}
    >
      <FlatList
        key={isGrid ? "grid" : "list"}
        data={todos}
        numColumns={isGrid ? 2 : 1}
        keyExtractor={(item) => item.documentId}
        columnWrapperStyle={
          isGrid ? { justifyContent: "space-between" } : undefined
        }
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: isDark ? "#1E1E1E" : "#F3F3F3",
              padding: 20,
              borderRadius: 16,
              marginBottom: 16,
              width: isGrid ? "48%" : "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => router.push(`/${item.documentId}/view-details`)}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: isDark ? "#FFF" : "#000",
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ position: "absolute", top: 8, right: 8 }}
              onPress={() => handleDelete(item.documentId)}
            >
              <FontAwesome5
                name="trash-alt"
                size={20}
                color={isDark ? "#FFF" : "black"}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
