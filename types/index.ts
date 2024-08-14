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