import { Image, ScrollView, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import "../styles.css";
import { Redirect, router } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";

NativeWindStyleSheet.setOutput({ web: "native", default: "native" });

const App = () => {
  const { loading, isLogged } = useGlobalContext();
  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">
          <View className="flex flex-row mb-8">
            <Image
              source={images.logo}
              className="w-[85px] h-[85px]"
              resizeMode="contain"
            />
            <View className="relative">
              <Text className="text-4xl text-red-800 font-bold text-center">
                CE
                <br />
                RO
              </Text>
            </View>
          </View>
          <Image
            source={images.cards}
            className="max-w-[300px] w-full h-[300px] rounded-3xl"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-red-800">CERO</Text>
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
