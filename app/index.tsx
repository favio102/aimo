import { Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import "../styles.css";
import { Link } from "expo-router";

const App = () => {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-yellow-400 text-2xl">
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style="auto" />
      <Link href="/profile" className="text-3xl text-blue-600">Profile</Link>
    </View>
  );
};

export default App;
