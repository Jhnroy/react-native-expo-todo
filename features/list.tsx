"use client";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import axios from "axios";
import { router, useFocusEffect } from "expo-router";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { isContainerGridAtom } from "../atoms/atom"; // import your atom

export default function ListView() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [isGrid] = useAtom(isContainerGridAtom);
  console.log(isGrid); // use Jotai atom here

  const API_URL = process.env.EXPO_PUBLIC_API_URL + "/todos";

  const fetchTodos = useCallback(
    async (searchText: string = "") => {
      try {
        setLoading(true);

        let url = API_URL;

        if (searchText) {
          url = `${API_URL}?filters[title][$containsi]=${searchText}`;
        }

        const response = await axios.get(url);

        setTodos(response.data.data);
      } catch (error: any) {
        console.error(error);
        Alert.alert("Error", "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    },
    [API_URL],
  );

  useFocusEffect(
    useCallback(() => {
      fetchTodos();
    }, [fetchTodos]),
  );

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchTodos(search);
    }, 500);

    return () => clearTimeout(delay);
  }, [search, fetchTodos]);

  const handleDelete = (docId: string) => {
    Alert.alert("Confirm Delete", "Delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/${docId}`);

            setTodos((prev) =>
              prev.filter((item) => item.documentId !== docId),
            );
          } catch {
            Alert.alert("Error", "Delete failed");
          }
        },
      },
    ]);
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
        <ActivityIndicator size="large" color={isDark ? "#FFF" : "blue"} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 48,
        backgroundColor: isDark ? "#121212" : "#FFF",
      }}
    >
      {/* SEARCH */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: isDark ? "#1E1E1E" : "#F3F3F3",
          borderRadius: 12,
          paddingHorizontal: 12,
          marginBottom: 20,
        }}
      >
        <FontAwesome5
          name="search"
          size={16}
          color={isDark ? "#FFF" : "#000"}
        />

        <TextInput
          placeholder="Search task..."
          placeholderTextColor={isDark ? "#AAA" : "#666"}
          value={search}
          onChangeText={setSearch}
          style={{
            flex: 1,
            padding: 10,
            color: isDark ? "#FFF" : "#000",
            marginLeft: 8,
          }}
        />
      </View>

      <FlatList
        data={todos}
        numColumns={isGrid ? 2 : 1}
        key={isGrid ? "g" : "l"}
        columnWrapperStyle={
          isGrid ? { justifyContent: "space-between" } : undefined
        }
        keyExtractor={(item) => item.documentId}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: isDark ? "#1E1E1E" : "#F3F3F3",
              padding: 20,
              borderRadius: 16,
              marginBottom: 16,
              width: isGrid ? "48%" : "100%",
              position: "relative",
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
                color={isDark ? "#FFF" : "#000"}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
