import { useState } from "react";
import { ScrollView, View } from "react-native";
import { ThemedText } from "@shared/components/themed-text";
import { Input } from "@shared/components/ui/input";
import { Mail, Lock, Search, User, KeyRound } from "lucide-react-native";

export default function InputFieldsScreen() {
  const [searchValue, setSearchValue] = useState("");
  const [emailValue, setEmailValue] = useState("invalid-email.com");

  return (
    <ScrollView 
      className="flex-1 p-4 bg-background" 
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Section 1: Basic & Icons */}
      <View className="mb-8 gap-4">
        <ThemedText style={{ fontSize: 18, fontWeight: "700" }}>
          1. Basic & Icon Variants
        </ThemedText>

        <Input placeholder="Minimal input without label" />

        <Input
          label="Full Name"
          placeholder="e.g. John Doe"
          leftIcon={<User size={20} />}
        />

        <Input
          placeholder="Search products, brands..."
          leftIcon={<Search size={20} />}
          value={searchValue}
          onChangeText={setSearchValue}
        />
      </View>

      {/* Section 2: Authentication Fields */}
      <View className="mb-8 gap-4">
        <ThemedText style={{ fontSize: 18, fontWeight: "700" }}>
          2. Auth Fields (Email & Password)
        </ThemedText>

        <Input
          label="Email Address"
          placeholder="name@example.com"
          leftIcon={<Mail size={20} />}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          type="password"
          label="Password"
          placeholder="Enter secure password"
          leftIcon={<Lock size={20} />}
        />

        <Input
          type="password"
          label="Confirm Password"
          placeholder="Re-enter password"
          leftIcon={<KeyRound size={20} />}
        />
      </View>

      {/* Section 3: Error & Validation States */}
      <View className="mb-8 gap-4">
        <ThemedText style={{ fontSize: 18, fontWeight: "700" }}>
          3. Error & Validation States
        </ThemedText>

        <Input
          label="Email Address"
          placeholder="name@example.com"
          leftIcon={<Mail size={20} />}
          value={emailValue}
          onChangeText={setEmailValue}
          error="Please enter a valid email address"
        />

        <Input
          type="password"
          label="Password"
          placeholder="Enter password"
          leftIcon={<Lock size={20} />}
          error="Invalid email or password. Please try again."
        />
      </View>

      {/* Section 4: Disabled / Read-Only State */}
      <View className="mb-8 gap-4">
        <ThemedText style={{ fontSize: 18, fontWeight: "700" }}>
          4. Disabled / Read-Only
        </ThemedText>

        <Input
          label="Account ID (Read Only)"
          value="USR-892410"
          editable={false}
          leftIcon={<User size={20} />}
        />
      </View>
    </ScrollView>
  );
}