import { router } from "expo-router";
import { Lock, Mail, Phone, User } from "lucide-react-native";
import { useState } from "react";
import { Text, View } from "react-native";

import { Button } from "@shared/components/ui/button";
import { ErrorModal } from "@shared/components/ui/error-modal";
import { Input } from "@shared/components/ui/input";
import { FontFamily, FontSize } from "@shared/constants/theme";
import { useTheme } from "@shared/hooks/use-theme";
import { useRegister } from "../hooks/useAuth";

const regexErrors = {
  name: "Name can only contain letters and spaces",
  email: "Invalid email format",
  phone: "Invalid phone number format",
  password:
    "Password must be at least 8 characters long and contain at least one letter and one number",
  confirmPassword: "Passwords do not match",
};

const requiredErrors = {
  firstName: "First name is required",
  lastName: "Last name is required",
  email: "Email is required",
  phone: "Phone number is required",
  password: "Password is required",
  confirmPassword: "Please confirm your password",
};

export default function RegisterForm() {
  const { colors } = useTheme();

  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and one number

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState<string | undefined>();
  const [lastNameError, setLastNameError] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | undefined
  >();
  const { register, loading, error: apiError, resetError } = useRegister();

  const handleRegister = async () => {
    setFirstNameError(undefined);
    setLastNameError(undefined);
    setPhoneError(undefined);
    setEmailError(undefined);
    setPasswordError(undefined);
    setConfirmPasswordError(undefined);
    resetError();

    handleFirstNameChange(firstName);
    handleLastNameChange(lastName);
    handleEmailChange(email);
    handlePhoneChange(phone);
    handlePasswordChange(password);
    handleConfirmPasswordChange(confirmPassword);

    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      phoneError ||
      passwordError ||
      confirmPasswordError
    ) {
      return;
    }

    try {
      await register({ firstName, lastName, email, phone, password });
      router.dismissTo("/(tabs)");
    } catch {
      // Error is captured and displayed automatically via apiError
    }
  };

  const handleEmailChange = (text: string) => {
    if (text && !emailRegex.test(text)) {
      setEmailError(regexErrors.email);
    } else if (!text) {
      setEmailError(requiredErrors.email);
    } else {
      setEmailError(undefined);
    }
    setEmail(text);
    resetError();
  };

  const handleFirstNameChange = (text: string) => {
    if (text && !nameRegex.test(text)) {
      setFirstNameError(regexErrors.name);
    } else if (!text) {
      setFirstNameError(requiredErrors.firstName);
    } else {
      setFirstNameError(undefined);
    }
    setFirstName(text);
    resetError();
  };

  const handleLastNameChange = (text: string) => {
    if (text && !nameRegex.test(text)) {
      setLastNameError(regexErrors.name);
    } else if (!text) {
      setLastNameError(requiredErrors.lastName);
    } else {
      setLastNameError(undefined);
    }
    setLastName(text);
    resetError();
  };

  const handlePhoneChange = (text: string) => {
    if (text && !phoneRegex.test(text)) {
      setPhoneError(regexErrors.phone);
    } else if (!text) {
      setPhoneError(requiredErrors.phone);
    } else {
      setPhoneError(undefined);
    }
    setPhone(text);
    resetError();
  };

  const handlePasswordChange = (text: string) => {
    if (text && !passwordRegex.test(text)) {
      setPasswordError(regexErrors.password);
    } else if (!text) {
      setPasswordError(requiredErrors.password);
    } else {
      setPasswordError(undefined);
    }
    setPassword(text);
    resetError();
  };

  const handleConfirmPasswordChange = (text: string) => {
    if (text && text !== password) {
      setConfirmPasswordError(regexErrors.confirmPassword);
    } else if (!text) {
      setConfirmPasswordError(requiredErrors.confirmPassword);
    } else {
      setConfirmPasswordError(undefined);
    }
    setConfirmPassword(text);
    resetError();
  };

  return (
    <View className="p-6">
      <Input
        containerClassName="pt-4"
        label="First Name"
        leftIcon={<User size={15} />}
        placeholder="John"
        value={firstName}
        onChangeText={handleFirstNameChange}
        error={firstNameError}
      />

      <Input
        containerClassName="pt-4"
        label="Last Name"
        leftIcon={<User size={15} />}
        placeholder="Doe"
        value={lastName}
        onChangeText={handleLastNameChange}
        error={lastNameError}
      />

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
        label="Phone"
        leftIcon={<Phone size={15} />}
        placeholder="+1 234 567 8900"
        value={phone}
        onChangeText={handlePhoneChange}
        error={phoneError}
      />

      <Input
        containerClassName="pt-4"
        label="Password"
        leftIcon={<Lock size={15} />}
        placeholder="Password"
        type="password"
        value={password}
        onChangeText={handlePasswordChange}
        error={passwordError}
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
      />

      <ErrorModal
        visible={!!apiError}
        message={apiError}
        onClose={resetError}
        title="Registration failed"
      />

      <Button
        variant="default"
        size="lg"
        className="w-full mt-4"
        textStyle={{
          fontFamily: FontFamily.black,
          fontSize: FontSize.md,
        }}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>
      <View className="flex-row items-center justify-center gap-2 mt-6">
        <Text
          style={{
            color: colors.foreground,
            fontFamily: FontFamily.regular,
            fontSize: FontSize.sm,
          }}
        >
          Already have an account?
        </Text>
        <Button
          variant="link"
          size="sm"
          className="p-0"
          textStyle={{
            color: colors.primary,
            fontFamily: FontFamily.bold,
            fontSize: FontSize.md,
          }}
          onPress={() =>
            router.push({ pathname: "/login", params: { from: "register" } })
          }
        >
          Sign In
        </Button>
      </View>
    </View>
  );
}
