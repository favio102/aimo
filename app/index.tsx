import { Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

const App = () => {
  return (
    <View className="flex-1 items-center justify-center bg-blue-800">
      <Text className="text-6xl text-yellow-300">test test</Text>
      <StatusBar style="auto" />
      <Link href="/profile" className='text-orange-500'>
        Go to profile
      </Link>
    </View>
  );
};

export default App;