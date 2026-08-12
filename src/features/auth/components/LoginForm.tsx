import { router } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { useLogin } from "@features/auth/hooks/useAuth";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { FontFamily, FontSize } from "@shared/constants/theme";
import { useTheme } from "@shared/hooks/use-theme";

export default function LoginForm() {
  const { colors } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  const { login, loading, error: apiError, resetError } = useLogin();

  const handleLogin = async () => {
    setEmailError(undefined);
    setPasswordError(undefined);
    resetError();

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    try {
      await login({ email, password });
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/(tabs)");
      }
    } catch {
      // Error is captured and displayed automatically via apiError
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(undefined);
    resetError();
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(undefined);
    resetError();
  };

  return (
    <View className="p-6">
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

      <Input
        containerClassName="pt-4"
        label="Password"
        leftIcon={<Lock size={15} />}
        placeholder="Password"
        type="password"
        value={password}
        onChangeText={handlePasswordChange}
        error={passwordError || apiError}
      />

      <View className="flex items-end mt-2">
        <Pressable>
          <Text
            className="text-right my-4"
            style={{
              color: colors.primary,
              fontFamily: FontFamily.semiBold,
              fontSize: FontSize.sm,
            }}
          >
            Forgot Password?
          </Text>
        </Pressable>

        <Button
          variant="default"
          size="lg"
          className="w-full"
          textStyle={{
            fontFamily: FontFamily.black,
            fontSize: FontSize.md,
          }}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </View>
    </View>
  );
}
