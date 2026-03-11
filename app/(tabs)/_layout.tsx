"use client";

import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { atom, useAtom } from "jotai";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

// Jotai atom for grid/list toggle
export const isContainerGridAtom = atom(false);

export default function TabLayout() {
  // Use atom for grid/list
  const [isGrid, setIsGrid] = useAtom(isContainerGridAtom);
  // Local state for dark mode
  const [isDark, setIsDark] = useState(false);

  const headerStyle = {
    backgroundColor: isDark ? "#1E1E1E" : "#FFF",
    borderBottomColor: isDark ? "#333" : "#CCC",
  };

  const textStyle = {
    color: isDark ? "#FFF" : "#000",
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: isDark ? "#fff" : "#000",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: isDark ? "#121212" : "#FFF",
          borderTopColor: isDark ? "#333" : "#CCC",
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

              <View className="flex-row space-x-4 gap-3">
                {/* Grid/List toggle */}
                <TouchableOpacity onPress={() => setIsGrid((prev) => !prev)}>
                  {isGrid ? (
                    <AntDesign
                      name="unordered-list"
                      size={24}
                      color={isDark ? "#FFF" : "black"}
                    />
                  ) : (
                    <Feather
                      name="grid"
                      size={24}
                      color={isDark ? "#FFF" : "black"}
                    />
                  )}
                </TouchableOpacity>

                {/* Dark mode toggle */}
                <TouchableOpacity onPress={() => setIsDark((prev) => !prev)}>
                  <Feather
                    name={isDark ? "sun" : "moon"}
                    size={24}
                    color={isDark ? "#FFD700" : "#000"}
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
              className="flex-row justify-between px-4 py-2 pt-safe"
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

// Example HomeScreen (home.tsx)
export function HomeScreen() {
  const [isGrid] = useAtom(isContainerGridAtom);
  const [isDark, setIsDark] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? "#121212" : "#FFF",
        padding: 16,
      }}
    >
      <Text style={{ color: isDark ? "#FFF" : "#000", marginBottom: 12 }}>
        Current Layout: {isGrid ? "Grid" : "List"}
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {[...Array(6)].map((_, i) => (
          <View
            key={i}
            style={{
              width: isGrid ? "48%" : "100%",
              height: 100,
              backgroundColor: isDark ? "#333" : "#EEE",
              marginBottom: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: isDark ? "#FFF" : "#000" }}>
              Task {i + 1}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
