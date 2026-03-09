import { TodoAtom } from "@/atoms/atom";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AddEdit() {
  const [todos, setTodos] = useAtom(TodoAtom);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const isDisabled = !title.trim() || !content.trim();

  const handleSave = () => {
    if (isDisabled) {
      Alert.alert("Error", "Please fill in both Title and Content");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
    };

    setTodos([...todos, newTask]);

    Alert.alert("Success", "Task saved successfully!");
    router.back();
  };

  return (
    <View className="flex-1 bg-gray-100 px-6 pt-10">
      <Text className="text-lg font-semibold mb-2">Title</Text>

      <TextInput
        placeholder="Enter task title"
        placeholderTextColor="#94a3b8"
        className="rounded-2xl px-5 py-3 text-lg mb-6 bg-[#0000000D]"
        value={title}
        onChangeText={setTitle}
      />

      <Text className="text-lg font-semibold mb-2">Content</Text>

      <TextInput
        placeholder="Enter task content"
        placeholderTextColor="#94a3b8"
        multiline
        textAlignVertical="top"
        className="rounded-2xl px-5 py-4 text-lg h-80 bg-[#0000000D]"
        value={content}
        onChangeText={setContent}
      />

      <View className="absolute bottom-10 left-6 right-6">
        <TouchableOpacity
          className={`py-5 rounded-2xl shadow-lg ${
            isDisabled ? "bg-gray-400" : "bg-blue-600"
          }`}
          onPress={handleSave}
          disabled={isDisabled}
        >
          <Text className="text-center text-white text-lg font-semibold">
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
