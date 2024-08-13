import { Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import "../styles.css";
import { Link } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({ web: "native", default: "native" });

const App = () => {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="font-pextrabold text-2xl">AIMO</Text>
      <StatusBar style="auto" />
      <Link href="/home" className="text-3xl text-blue-600">
        Home
      </Link>
    </View>
  );
};

export default App;
