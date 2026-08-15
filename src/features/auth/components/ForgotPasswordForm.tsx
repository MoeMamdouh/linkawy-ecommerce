import { Mail } from "lucide-react-native";
import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import { useForgotPassword } from "@features/auth/hooks/useAuth";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { FontFamily, FontSize } from "@shared/constants/theme";
import { useTheme } from "@shared/hooks/use-theme";
import { ErrorModal } from "@shared/components/ui/error-modal";

export default function ForgotPasswordForm() {
  const { colors } = useTheme();

  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState<string | undefined>();

  const { recoverPassword, loading, error: apiError, resetError } = useForgotPassword();

  const handleForgotPassword = async () => {
    setEmailError(undefined);
    resetError();

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    try {
        await recoverPassword(email);
    } catch {
      // Error is captured and displayed automatically via apiError
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(undefined);
    resetError();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="p-6" style={{ flex: 1, backgroundColor: colors.background }}>
      <Input
        label="Email"
        leftIcon={<Mail size={15} />}
        placeholder="name@example.com"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        error={emailError}
      />

      <ErrorModal
      visible={!!apiError}
      message={apiError}
      onClose={resetError}
      title="Forgot password failed"
    />

      <Button
        variant="default"
        size="lg"
        className="w-full mt-6"
        textStyle={{
          fontFamily: FontFamily.black,
          fontSize: FontSize.md,
        }}
        onPress={handleForgotPassword}
        disabled={loading}
      >
        {loading ? "Sending reset link..." : "Send Reset Link"}
      </Button>
    </KeyboardAvoidingView>
  );
}
