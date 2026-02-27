import { TodoAtom } from "@/atoms/atom";
import { CustomButton } from "@/components/custom-butotn";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AddEdit() {
  const [todos, setTodos] = useAtom(TodoAtom);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    if (!title.trim() || !notes.trim()) {
      Alert.alert("Error", "Please fill in both Title and Notes");
      router.back();
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      notes,
    };
    // @ts-expect-error typings
    setTodos([...todos, newTask]);

    Alert.alert("Success", "Task saved successfully!");
    setTitle("");
    setNotes("");
  };

  return (
    <View className="flex-1 bg-gray-100 px-6 pt-10">
      <Text className="text-lg font-semibold mb-2"> Title </Text>
      <TextInput
        placeholder="Enter task title"
        placeholderTextColor="#94a3b8"
        className="border-gray-00 rounded-2xl px-5 py-2 text-lg mb-6 bg-[#0000000D]"
        value={title}
        onChangeText={setTitle}
      />
      <Text className="text-lg font-semibold mb-2"> Notes </Text>
      <TextInput
        placeholder="Enter notes about the task"
        placeholderTextColor="#94a3b8"
        multiline
        textAlignVertical="top"
        className="border-gray-200 rounded-2xl px-5 py-4 text-lg h-80 bg-[#0000000D] "
        value={notes}
        onChangeText={setNotes}
      />
      f
      <View className="absolute bottom-10 left-6 right-6">
        <CustomButton disabled>Save</CustomButton>
        <TouchableOpacity
          className="bg-blue-600 py-5 rounded-2xl shadow-lg"
          onPress={handleSave}
          disabled
        >
          <Text className="text-center text-white text-lg font-semibold">
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
