import { isContainerGridAtom, TodoAtom } from "@/atoms/atom";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

export default function ListView() {
  const [todos, setTodos] = useAtom(TodoAtom);
  const [isGrid] = useAtom(isContainerGridAtom);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDelete = () => {
    if (selectedId !== null) {
      setTodos((prev) => prev.filter((item) => item.id !== selectedId));
    }
    setModalVisible(false);
    setSelectedId(null);
  };

  const openModal = (id: number) => {
    setSelectedId(id);
    setModalVisible(true);
  };

  return (
    <View className="flex-1 bg-white px-5 pt-12 pb-6">
      <FlatList
        key={isGrid ? "grid" : "list"}
        data={todos}
        numColumns={isGrid ? 2 : 1}
        keyExtractor={(item) => item.id.toString()}
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
              onPress={() => router.push(`/${item.id}/view-details`)}
            >
              <Text className="text-lg font-bold">{item.title}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="absolute top-2 right-2"
              onPress={() => openModal(item.id)}
            >
              <FontAwesome5 name="trash-alt" size={20} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal transparent visible={modalVisible} animationType="fade">
        <View className="flex-1 bg-black/40 justify-center items-center">
          <View className="bg-white w-80 p-6 rounded-2xl">
            <Text className="text-lg font-bold mb-4 text-center">
              Delete Task
            </Text>
            <Text className="mb-6">
              Are you sure you want to delete this task?
            </Text>

            <View className="flex-row justify-center  gap-4">
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text className="text-gray-500 bg-white py-2 px-4 rounded-2xl">
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleDelete}>
                <Text className="text-white bg-red-500 py-2 px-4 rounded-2xl font-bold">
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
