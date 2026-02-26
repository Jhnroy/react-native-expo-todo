"use client";

import { TodoAtom } from "@/atoms/atom";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Edit() {
  const [todos, setTodos] = useAtom(TodoAtom);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const numericId = id ? Number(id) : undefined;

  const currentTodo = todos.find((todo) => todo.id === numericId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (currentTodo) {
      setTitle(currentTodo.title);
      setContent(currentTodo.content);
    }
  }, [currentTodo]);

  if (!currentTodo) {
    return <Text>Task not found</Text>;
  }

  const handleEdit = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === numericId) {
        return { ...todo, title, content };
      }
      return todo;
    });
    setTodos(updatedTodos);
    router.back();
  };

  return (
    <View className="flex-1 bg-gray-100 px-6 pt-10">
      <View className="mb-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-blue-700 text-lg">Cancel</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-lg font-semibold mb-2">Title</Text>
      <TextInput
        placeholder="Enter task title"
        placeholderTextColor="#94a3b8"
        className="border-gray-200 rounded-2xl px-5 py-2 text-lg mb-6 bg-[#0000000D]"
        value={title}
        onChangeText={setTitle}
      />

      <Text className="text-lg font-semibold mb-2">Content</Text>
      <TextInput
        placeholder="Enter notes about the task"
        placeholderTextColor="#94a3b8"
        multiline
        textAlignVertical="top"
        className="border-gray-200 rounded-2xl px-5 py-4 text-lg h-80 bg-[#0000000D]"
        value={content}
        onChangeText={setContent}
      />

      <View className="absolute bottom-10 left-6 right-6">
        <TouchableOpacity
          className="bg-blue-600 py-5 rounded-2xl shadow-lg"
          onPress={handleEdit}
        >
          <Text className="text-center text-white text-lg font-semibold">
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
