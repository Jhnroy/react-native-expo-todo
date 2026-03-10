"use client";

import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ViewDetails() {
  const { id } = useLocalSearchParams();
  const documentId = id as string;

  const [currentTodo, setCurrentTodo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  // const [modalVisible, setModalVisible] = useState(false);

  const API_URL = process.env.EXPO_PUBLIC_API_URL + "/todos";

  // FETCH TODO
  const fetchTodo = useCallback(async () => {
    if (!documentId) return;

    try {
      setLoading(true);

      const response = await axios.get(
        `${API_URL}?filters[documentId][$eq]=${documentId}`,
      );

      const todo = response.data.data[0];

      console.log("Fetched Todo:", todo);

      setCurrentTodo(todo || null);
    } catch (error: any) {
      console.error("Fetch todo error:", error.response || error.message);
      Alert.alert("Error", "Failed to fetch task.");
      setCurrentTodo(null);
    } finally {
      setLoading(false);
    }
  }, [API_URL, documentId]);

  useFocusEffect(
    useCallback(() => {
      fetchTodo();
    }, [fetchTodo]),
  );

  // DELETE FUNCTION
  const handleDelete = () => {
    if (!currentTodo) return;

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

              console.log("Deleting documentId:", currentTodo.documentId);

              await axios.delete(`${API_URL}/${currentTodo.documentId}`);

              Alert.alert("Success", "Task deleted successfully!");

              router.back();
            } catch (error: any) {
              console.error(
                "Delete error:",
                error.response?.data || error.message,
              );

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
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (!currentTodo) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-semibold">Task not found</Text>
      </View>
    );
  }

  const title = currentTodo.title;
  const notes = currentTodo.notes;

  return (
    <View className="flex-1 bg-white px-5 pt-12 pb-6">
      {/* HEADER */}
      <View className="flex-row justify-between items-center mb-6">
        {/* BACK BUTTON */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center gap-2"
        >
          <AntDesign name="arrow-left" size={20} color="blue" />
          <Text className="text-blue-600 text-base font-medium">Back</Text>
        </TouchableOpacity>

        {/* ACTION BUTTONS */}
        <View className="flex-row items-center gap-6">
          {/* EDIT */}
          <TouchableOpacity onPress={() => router.push(`/${documentId}/edit`)}>
            <AntDesign name="edit" size={22} color="blue" />
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTENT */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-6">
          <Text className="text-gray-500 text-sm mb-2">Title</Text>

          <View className="bg-gray-100 p-4 rounded-2xl shadow-sm">
            <Text className="text-3xl font-bold text-gray-800">{title}</Text>
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-gray-500 text-sm mb-2">Notes</Text>

          <View className="bg-gray-100 p-4 rounded-2xl shadow-sm min-h-[150px]">
            <Text className="text-base text-gray-700 leading-6">{notes}</Text>
          </View>
        </View>
      </ScrollView>

      {/* DELETE BUTTON */}
      <TouchableOpacity
        onPress={handleDelete}
        className="bg-red-500 py-4 rounded-2xl items-center"
      >
        <Text className="text-white font-semibold text-lg">Delete Task</Text>
      </TouchableOpacity>
    </View>
  );
}
