import ViewDetails from "@/features/view";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ListViewID() {
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-gray-100 pt-safe">
      <View className="flex-1 bg-white px-4">
        <Text className="text-lg font-bold mb-4 text-center">Details</Text>

        <ViewDetails id={id as string} />
      </View>
    </View>
  );
}
