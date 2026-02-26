import { isContainerGridAtom, TodoAtom } from "@/atoms/atom";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function ListView() {
  const [todos, setTodos] = useAtom(TodoAtom);
  const [isGrid, setGrid] = useAtom(isContainerGridAtom);

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View className="flex-1 bg-white px-4 pt-4">
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
              elevation-md
              mb-4
              ${isGrid ? "w-[48%]" : "w-full"}
            `}
          >
            <TouchableOpacity
              onPress={() => router.push(`/${item.id}/view-details`)}
            >
              <Text className="text-lg font-bold">{item.title}</Text>
            </TouchableOpacity>

            {/* <Text className="text-lg font-bold">{item.title}</Text> */}

            <TouchableOpacity className="absolute top-2 right-2">
              <FontAwesome5
                name="trash-alt"
                size={24}
                color="black"
                onPress={() => handleDelete(item.id)}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
