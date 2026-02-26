import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function ViewDetails() {
  const { id } = useLocalSearchParams();
  const numericId = id ? Number(id) : undefined;
  const content = `Content ${numericId}`;

  return (
    <View className="flex-1 p-5 gap-3 pb-safe">
      <View className="flex-row justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-blue-700 text-l">
            <AntDesign
              name="arrow-left"
              size={24}
              color="black"
              className="gap-3"
            />
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push(`/${id}/edit`)}>
          <Text className="text-blue-700 text-l">Edit</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text>Title</Text>
        <Text className="text-5xl bg-gray-100  p-3 rounded-lg elevation-md">
          Task {numericId}
        </Text>
      </View>

      <View className="flex-1 mt-3">
        <Text>Notes</Text>
        <Text className="text-black mt-3 bg-gray-100  p-3 flex-1 rounded-lg elevation-md">
          {content}
        </Text>
      </View>
      <View className="">
        <TouchableOpacity className="justify-center items-center">
          <Text className="text-red-500 font-medium text-lg mb-3">
            Delete Task
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
