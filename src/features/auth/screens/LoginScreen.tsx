import { View } from "react-native";
import LoginForm from "../components/LoginForm";
import { useTheme } from "@shared/hooks/use-theme";
import AuthHeader from "../components/AuthHeader";

export default function LoginScreen() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <AuthHeader type="login" />
      <LoginForm />
    </View>
  );
}