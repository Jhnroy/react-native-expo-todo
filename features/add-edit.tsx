import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AddEdit() {
  return (
    <View className="flex-1 bg-gray-100 px-6 pt-10"> 

      <Text className="text-lg font-semibold mb-2"> Title </Text>
      <TextInput 
      placeholder="Enter notes about the task"
      placeholderTextColor={"#94a3b8"}
      className=" border-gray-200 
      rounded-2xl 
      px-5 py-2
      text-lg mb-6
      bg-[#0000000D]" />

      <Text className="text-lg font-semibold mb-2"> Notes </Text>
      
      <TextInput 
      placeholder="Enter notes about the task"
      placeholderTextColor={"#94a3b8"}
      multiline
      textAlignVertical = "top"

      className=" border-gray-200 
      rounded-2xl
      px-5 py-4
      text-lg
      h-80
      elevation: 5
      bg-[#0000000D]" />

      <View className="absolute bottom-10 left-6 right-6">
        <TouchableOpacity className="bg-blue-600 py-5 rounded-2xl shadow-lg">
          <Text className="text-center text-white text-lg font-semibold">
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
