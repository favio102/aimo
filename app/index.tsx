import { Image, ScrollView, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import "../styles.css";
import { Redirect, router } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { isLoading } from "expo-font";

NativeWindStyleSheet.setOutput({ web: "native", default: "native" });

const App = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">AIMO</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 right-1"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity meets innovations: <br /> embark on a journey of
            limitless exploration with AIMO.
          </Text>
          <CustomButton
            title="Continue With Email"
            containerStyles="w-full mt-7"
            handlePress={() => router.push("/sign-in")}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default App;
