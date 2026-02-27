import { isContainerGridAtom, TodoAtom } from "@/atoms/atom";
import { CustomModal } from "@/components/custom-modal";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

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

  const closeModal = () => {
    setModalVisible(false);
  }

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

      <CustomModal 
        modalVisible={modalVisible}
        onClose={closeModal}
        onDelete={handleDelete}
      />
    </View>
  );
}
