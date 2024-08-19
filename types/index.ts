import { ReactNode } from "react";
import { ImageSourcePropType } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

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

export interface UserProps {
  id: string;
  name: string;
  email: string;
}

export interface GlobalContextProps {
  isLogged: boolean;
  loading: boolean;
  setIsLogged: (isLogged: boolean) => void;
  user: UserProps | null;
  setUser: (user: UserProps | null) => void;
}

export interface GlobalProviderProps {
  children: ReactNode;
}

export interface SignInFormProps {
  email: string;
  password: string;
}

export type SignInProps = NativeStackScreenProps<{}, "SignIn">;

export interface InfoBoxProps {
  title: string | number;
  subtitle?: string;
  containerStyles?: string;
  titleStyles?: string;
}
