"use client";

import { CustomModal } from "@/components/custom-modal";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
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
  const todoId = id as string;

  const [currentTodo, setCurrentTodo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const API_URL = process.env.EXPO_PUBLIC_API_URL + "/todos";

  // Fetch a single todo
  const fetchTodo = useCallback(async () => {
    if (!todoId) return;

    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/${todoId}`);
      console.log("Fetched todo:", response.data);

      const todo = response.data?.data;
      if (!todo) {
        setCurrentTodo(null);
      } else {
        setCurrentTodo(todo);
      }
    } catch (error: any) {
      console.error("Fetch todo error:", error.message);
      Alert.alert("Error", "Failed to fetch task.");
      setCurrentTodo(null);
    } finally {
      setLoading(false);
    }
  }, [API_URL, todoId]);

  useEffect(() => {
    fetchTodo();
  }, [fetchTodo]);

  // Delete todo function
  const handleDelete = async () => {
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
              await axios.delete(`${API_URL}/${currentTodo.id}`);

              Alert.alert("Success", "Task deleted successfully!");
              setModalVisible(false);
              router.back();
            } catch (error: any) {
              console.error("Delete error:", error?.response || error.message);
              Alert.alert("Error", "Failed to delete task. Please try again.");
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

  // Use optional chaining to prevent undefined errors
  const title = currentTodo?.attributes?.title ?? currentTodo?.title ?? "";
  const notes = currentTodo?.attributes?.notes ?? currentTodo?.notes ?? "";

  return (
    <View className="flex-1 bg-white px-5 pt-12 pb-6">
      {/* HEADER */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center gap-2"
        >
          <AntDesign name="arrow-left" size={20} color="blue" />
          <Text className="text-blue-600 text-base font-medium">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push(`/${todoId}/edit`)}>
          <Text className="text-blue-600 text-base font-semibold">Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* TITLE */}
        <View className="mb-6">
          <Text className="text-gray-500 text-sm mb-2">Title</Text>
          <View className="bg-gray-100 p-4 rounded-2xl shadow-sm">
            <Text className="text-3xl font-bold text-gray-800">{title}</Text>
          </View>
        </View>

        {/* NOTES */}
        <View className="mb-8">
          <Text className="text-gray-500 text-sm mb-2">Notes</Text>
          <View className="bg-gray-100 p-4 rounded-2xl shadow-sm min-h-[150px]">
            <Text className="text-base text-gray-700 leading-6">{notes}</Text>
          </View>
        </View>
      </ScrollView>

      {/* DELETE BUTTON */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-red-500 py-4 rounded-2xl items-center"
      >
        <Text className="text-white font-semibold text-lg">Delete Task</Text>
      </TouchableOpacity>

      {/* CUSTOM MODAL */}
      <CustomModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onDelete={handleDelete}
      />
    </View>
  );
}
