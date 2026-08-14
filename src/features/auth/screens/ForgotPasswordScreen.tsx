import { View } from "react-native";
import { useTheme } from "@shared/hooks/use-theme";
import AuthHeader from "../components/AuthHeader";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

export default function ForgotPasswordScreen() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <AuthHeader type="forgot-password" />
      <ForgotPasswordForm />
    </View>
  );
}