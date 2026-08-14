import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import { useResetPasswordByUrl } from "@features/auth/hooks/useAuth";
import { Button } from "@shared/components/ui/button";
import { ErrorModal } from "@shared/components/ui/error-modal";
import { Input } from "@shared/components/ui/input";
import { useTheme } from "@shared/hooks/use-theme";
import { Lock } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function ResetPasswordForm() {
  const { colors } = useTheme();

    //   const { resetUrl } = useLocalSearchParams<{ resetUrl: string }>();
    const resetUrl = 

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and one number

  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | undefined
  >();

  const { resetPassword, loading, error, resetError } = useResetPasswordByUrl();

  const handleResetPassword = async () => {
    setPasswordError(undefined);
    setConfirmPasswordError(undefined);
    resetError();

    if (!resetUrl) {
      alert("Invalid or missing reset link.");
      return;
    }

    try {
      await resetPassword(resetUrl, password);
      router.replace("/(tabs)");
    } catch {
      // Error is captured and displayed automatically via apiError
    }
  };

  const handlePasswordChange = (text: string) => {
    if (text && !passwordRegex.test(text)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one letter and one number",
      );
    } else if (!text) {
      setPasswordError("Password is required");
    } else {
      setPasswordError(undefined);
    }
    setPassword(text);
    resetError();
  };

  const handleConfirmPasswordChange = (text: string) => {
    if (text && text !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else if (!text) {
      setConfirmPasswordError("Please confirm your password");
    } else {
      setConfirmPasswordError(undefined);
    }
    setConfirmPassword(text);
    resetError();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 p-6 justify-center"
      style={{ backgroundColor: colors.background }}
    >
      <Input
        containerClassName="pt-4"
        label="Password"
        leftIcon={<Lock size={15} />}
        placeholder="Password"
        type="password"
        value={password}
        onChangeText={handlePasswordChange}
        error={passwordError}
        secureTextEntry
      />

      <Input
        containerClassName="pt-4"
        label="Confirm Password"
        leftIcon={<Lock size={15} />}
        placeholder="Confirm Password"
        type="password"
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
        error={confirmPasswordError}
        secureTextEntry
      />

      <ErrorModal
        visible={!!error}
        message={error}
        onClose={resetError}
        title="Reset Password Error"
      />

      <Button
        className="mt-6"
        onPress={handleResetPassword}
        disabled={loading || !password.trim()}
      >
        {loading ? "Resetting Password..." : "Submit New Password"}
      </Button>
    </KeyboardAvoidingView>
  );
}
