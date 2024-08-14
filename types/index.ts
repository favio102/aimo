import { ImageSourcePropType } from "react-native";

export interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

export interface FormFieldProps {
  otherStyles?: string;
  title: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  value: string | number;
  keyboardType?: string;
  secureTextEntry?: boolean;
}

export interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

// export interface EnvConfig {
//   ENDPOINT_URL: string;
//   PLATFORM_URL: string;
//   PROJECT_ID: string;
//   DATABASE_ID: string;
//   USER_COLLECTION_ID: string;
//   VIDEOS_COLLECTION_ID: string;
//   STORAGE_ID: string;
// }

// declare module 'react-native-config' {
//   const config: EnvConfig;
// }
