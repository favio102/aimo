import { Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import "../styles.css";
import { Link } from "expo-router";

const App = () => {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="font-pextrabold text-2xl">
        AIMO
      </Text>
      <StatusBar style="auto" />
      <Link href="/profile" className="text-3xl text-blue-600">Profile</Link>
    </View>
  );
};

export default App;
