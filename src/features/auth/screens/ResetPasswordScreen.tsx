import { View } from "react-native";
import { useTheme } from "@shared/hooks/use-theme";
import AuthHeader from "../components/AuthHeader";
import ResetPasswordForm from "../components/ResetPasswordForm";

export default function ResetPasswordScreen() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <AuthHeader type="reset-password" />
      <ResetPasswordForm />
    </View>
  );
}