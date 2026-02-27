import { TodoAtom } from "@/atoms/atom";
import { CustomModal } from "@/components/custom-modal";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useLocalSearchParams } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ViewDetails() {
  const { id } = useLocalSearchParams();
  const numericId = id ? Number(id) : undefined;

  const [todos, setTodos] = useAtom(TodoAtom);

  const [modalVisible, setModalVisible] = useState(false);

  const currentTodo = todos.find((todo) => todo.id === numericId);

  if (!currentTodo) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-semibold">Task not found</Text>
      </View>
    );
  }

  const handleDelete = () => {
    const updatedTodos = todos.filter((todo) => todo.id !== numericId);
    setTodos(updatedTodos);
    router.back();
  };

  return (
    <View className="flex-1 bg-white px-5 pt-12 pb-6">
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center gap-2"
        >
          <AntDesign name="arrow-left" size={20} color="blue" />
          <Text className="text-blue-600 text-base font-medium">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push(`/${id}/edit`)}>
          <Text className="text-blue-600 text-base font-semibold">Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-6">
          <Text className="text-gray-500 text-sm mb-2">Title</Text>
          <View className="bg-gray-100 p-4 rounded-2xl shadow-sm">
            <Text className="text-3xl font-bold text-gray-800">
              {currentTodo.title}
            </Text>
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-gray-500 text-sm mb-2">Notes</Text>
          <View className="bg-gray-100 p-4 rounded-2xl shadow-sm min-h-[150px]">
            <Text className="text-base text-gray-700 leading-6">
              {currentTodo.content}
            </Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-red-500 py-4 rounded-2xl items-center"
      >
        <Text className="text-white font-semibold text-lg">Delete Task</Text>
      </TouchableOpacity>
      <CustomModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onDelete={handleDelete}
      />
    </View>
  );
}
