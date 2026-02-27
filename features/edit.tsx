"use client";

import { TodoAtom } from "@/atoms/atom";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Edit() {
  const [todos, setTodos] = useAtom(TodoAtom);
  const router = useRouter();
  const params = useLocalSearchParams();

  const todoId = useMemo(() => {
    if (!params.id) return undefined;
    return Array.isArray(params.id) ? params.id[0] : params.id;
  }, [params.id]);

  const currentTodo = todos.find((todo) => String(todo.id) === String(todoId));

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (currentTodo) {
      setTitle(currentTodo.title ?? "");
      setContent(currentTodo.content ?? "");
    }
  }, [currentTodo]);

  if (!currentTodo) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg font-semibold">Task not found</Text>
      </SafeAreaView>
    );
  }

  const handleEdit = () => {
    const updatedTodos = todos.map((todo) => {
      if (String(todo.id) === String(todoId)) {
        return {
          ...todo,
          title: (title ?? "").trim(),
          content: (content ?? "").trim(),
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
    router.back();
  };

  const isDisabled =
    (title ?? "").trim() === "" || (content ?? "").trim() === "";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <View>
          <Text className="text-center text-2xl font-semibold mt-4">Edit</Text>
        </View>

        <View className="flex-1 px-5 pt-6">
          <View className="flex-row justify-between items-center mb-8">
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-blue-600 text-base font-medium">
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleEdit} disabled={isDisabled}>
              <Text
                className={`text-base font-semibold ${
                  isDisabled ? "text-gray-400" : "text-blue-600"
                }`}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-1">
            <View className="mb-6">
              <Text className="text-gray-500 text-sm mb-2">Title</Text>
              <View className="bg-gray-100 rounded-2xl px-4 py-4">
                <TextInput
                  placeholder="Enter task title"
                  placeholderTextColor="#94a3b8"
                  className="text-lg font-semibold text-gray-800"
                  value={title}
                  onChangeText={(text) => setTitle(text ?? "")}
                />
              </View>
            </View>

            <View className="flex-1">
              <Text className="text-gray-500 text-sm mb-2">Content</Text>
              <View className="bg-gray-100 rounded-2xl px-4 py-4 flex-1">
                <TextInput
                  placeholder="Enter content about the task"
                  placeholderTextColor="#94a3b8"
                  multiline
                  textAlignVertical="top"
                  className="text-base text-gray-700 flex-1"
                  value={content}
                  onChangeText={(text) => setContent(text ?? "")}
                />
              </View>
            </View>
          </View>
        </View>

        <View className="px-5 pb-6 bg-white">
          <TouchableOpacity
            onPress={handleEdit}
            disabled={isDisabled}
            className={`py-4 rounded-2xl items-center ${
              isDisabled ? "bg-gray-400" : "bg-blue-600"
            }`}
          >
            <Text className="text-white font-semibold text-lg">
              Save changes
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
