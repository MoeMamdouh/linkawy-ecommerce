import { View } from "react-native";
import LoginHeader from "../components/LoginHeader";
import LoginForm from "../components/LoginForm";
import { useTheme } from "@shared/hooks/use-theme";

export default function LoginScreen() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <LoginHeader />
      <LoginForm />
    </View>
  );
}