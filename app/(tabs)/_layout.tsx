"use client";

import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  const [isGrid, setIsGrid] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // manual toggle

  const headerStyle = {
    backgroundColor: isDarkMode ? "#1E1E1E" : "#FFF",
    borderBottomColor: isDarkMode ? "#333" : "#CCC",
  };

  const textStyle = {
    color: isDarkMode ? "#FFF" : "#000",
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: isDarkMode ? "#fff" : "#000",
        tabBarInactiveTintColor: isDarkMode ? "#888" : "#888",
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#121212" : "#FFF",
          borderTopColor: isDarkMode ? "#333" : "#CCC",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          header: () => (
            <View
              style={headerStyle}
              className="flex-row justify-between px-4 py-2 pt-safe"
            >
              <Text style={textStyle} className="font-bold text-lg">
                Tasks
              </Text>
              <View className="flex-row space-x-4">
                {/* Toggle grid/list */}
                <TouchableOpacity onPress={() => setIsGrid((prev) => !prev)}>
                  {isGrid ? (
                    <AntDesign
                      name="unordered-list"
                      size={24}
                      color={isDarkMode ? "#FFF" : "black"}
                    />
                  ) : (
                    <Feather
                      name="grid"
                      size={24}
                      color={isDarkMode ? "#FFF" : "black"}
                    />
                  )}
                </TouchableOpacity>

                {/* Dark mode toggle */}
                <TouchableOpacity
                  onPress={() => setIsDarkMode((prev) => !prev)}
                >
                  <Feather
                    name={isDarkMode ? "sun" : "moon"}
                    size={24}
                    color={isDarkMode ? "#FFD700" : "#000"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="add"
        options={{
          header: () => (
            <View
              style={headerStyle}
              className="flex-row justify-between px-4 py-2"
            >
              <Text style={textStyle} className="font-bold text-lg">
                Add Task
              </Text>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <AntDesign name="plus-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
