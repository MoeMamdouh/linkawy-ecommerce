import { ScrollView } from "react-native";
import { useTheme } from "@shared/hooks/use-theme";
import RegisterForm from "../components/RegisterForm";
import AuthHeader from "../components/AuthHeader";

export default function RegisterScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <AuthHeader type="register" />
      <RegisterForm />
    </ScrollView>
  );
}