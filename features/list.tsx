"use client";

import { CustomModal } from "@/components/custom-modal";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import axios from "axios";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ListView() {
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  const isGrid = false;

  const API_URL = process.env.EXPO_PUBLIC_API_URL + "/todos";
  console.log("API_URL:", API_URL);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL!);
      console.log("Fetched todos:", response.data);
      setTodos(response.data.data); // Use the data array directly
    } catch (error: any) {
      console.error("Fetch error:", error.message);
      console.error("Error response:", error.response?.data);
      Alert.alert(
        "Error",
        "Failed to fetch tasks. Check your API URL and network.",
      );
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Delete a todo by documentId
  const handleDelete = async () => {
    if (!selectedDocId) return;

    try {
      await axios.delete(`${API_URL}/${selectedDocId}`);
      setTodos((prev) =>
        prev.filter((item) => item.documentId !== selectedDocId),
      );
      setModalVisible(false);
      setSelectedDocId(null);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to delete task");
    }
  };

  const openModal = (docId: string) => {
    setSelectedDocId(docId);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDocId(null);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-5 pt-12 pb-6">
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
            className={`
              bg-gray-100 
              p-5
              rounded-xl 
              mb-4
              ${isGrid ? "w-[48%]" : "w-full"}
            `}
          >
            <TouchableOpacity
              onPress={() => router.push(`/${item.documentId}/view-details`)}
            >
              <Text className="text-lg font-bold">{item.title}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="absolute top-2 right-2"
              onPress={() => openModal(item.documentId)}
            >
              <FontAwesome5 name="trash-alt" size={20} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />

      <CustomModal
        modalVisible={modalVisible}
        onClose={closeModal}
        onDelete={handleDelete}
      />
    </View>
  );
}
