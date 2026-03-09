"use client";

import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddEditScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const id = useMemo(() => {
    if (!params.id) return undefined;
    return Array.isArray(params.id) ? params.id[0] : params.id;
  }, [params.id]);

  const API_URL = process.env.EXPO_PUBLIC_API_URL + "/todos";

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const isEdit = !!id;

  console.log("API URL:", API_URL);
  console.log("EDIT ID:", id);

  useEffect(() => {
    const fetchTodo = async () => {
      if (!isEdit) return;

      try {
        const res = await axios.get(`${API_URL}/${id}`);
        const todo = res.data.data;

        setTitle(todo.title);
        setNotes(todo.notes);
      } catch (error: any) {
        console.log("FETCH ERROR:", error?.response?.data || error.message);
        Alert.alert("Error", "Failed to load task");
      }
    };

    fetchTodo();
  }, [id, isEdit]);

  const handleSave = async () => {
    console.log("Saving task...");

    if (!title.trim() || !notes.trim()) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        data: {
          title: title.trim(),
          notes: notes.trim(),
        },
      };

      console.log("Payload:", payload);

      if (isEdit) {
        const res = await axios.put(`${API_URL}/${id}`, payload);
        console.log("UPDATE RESPONSE:", res.data);

        Alert.alert("Success", "Task updated!");
      } else {
        const res = await axios.post(API_URL, payload);
        console.log("CREATE RESPONSE:", res.data);

        Alert.alert("Success", "Task created!");
      }

      router.back();
    } catch (error: any) {
      console.log("FULL ERROR:", error);

      if (error.response) {
        console.log("SERVER RESPONSE:", error.response.data);
        Alert.alert(
          "Server Error",
          JSON.stringify(error.response.data, null, 2),
        );
      } else if (error.request) {
        console.log("NO RESPONSE FROM SERVER");
        Alert.alert(
          "Network Error",
          "Could not reach the server. Check your API URL.",
        );
      } else {
        console.log("UNKNOWN ERROR:", error.message);
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !title.trim() || !notes.trim();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <View className="items-center mt-4">
          <Text className="text-2xl font-semibold">
            {isEdit ? "Edit Task" : "Add Task"}
          </Text>
        </View>

        <View className="flex-1 px-5 pt-6">
          <View className="mb-6">
            <Text className="text-gray-500 text-sm mb-2">Title</Text>

            <View className="bg-gray-100 rounded-2xl px-4 py-4">
              <TextInput
                placeholder="Enter task title"
                value={title}
                onChangeText={setTitle}
                className="text-lg font-semibold text-gray-800"
              />
            </View>
          </View>

          <View className="flex-1">
            <Text className="text-gray-500 text-sm mb-2">Notes</Text>

            <View className="bg-gray-100 rounded-2xl px-4 py-4 flex-1">
              <TextInput
                placeholder="Enter task notes"
                multiline
                textAlignVertical="top"
                value={notes}
                onChangeText={setNotes}
                className="text-base text-gray-700 flex-1"
              />
            </View>
          </View>
        </View>

        <View className="px-5 pb-6">
          <TouchableOpacity
            onPress={handleSave}
            disabled={isDisabled || loading}
            className={`py-4 rounded-2xl items-center ${
              isDisabled ? "bg-gray-400" : "bg-blue-600"
            }`}
          >
            <Text className="text-white font-semibold text-lg">
              {loading ? "Saving..." : "Save changes"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
