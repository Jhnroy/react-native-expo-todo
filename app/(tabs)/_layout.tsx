import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { useAtom } from "jotai";
import { Text, TouchableOpacity, View } from "react-native";
import { isContainerGridAtom } from "../../atoms/atom";

export default function TabLayout() {
  const [isGrid, setIsGrid] = useAtom(isContainerGridAtom);

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          header: () => {
            return (
              <View className="flex-row pt-safe justify-between px-4 py-2 border-b">
                <Text className="font-bold text-lg">Task</Text>

                <TouchableOpacity onPress={() => setIsGrid((prev) => !prev)}>
                  <Feather name="grid" size={24} color="black" />
                </TouchableOpacity>
              </View>
            );
          },
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="add"
        options={{
          header: () => {
            return (
              <View className="flex-row pt-safe justify-between px-4 py-2 border-b">
                <Text className="font-bold text-lg">Task</Text>
              </View>
            );
          },
          tabBarIcon: ({ color }) => (
            <AntDesign name="plus-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
