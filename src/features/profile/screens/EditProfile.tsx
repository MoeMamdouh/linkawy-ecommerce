import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Colors } from "@shared/constants/theme";
import { useColorScheme } from "@shared/hooks/use-color-scheme";
import { ArrowLeft, Pencil } from "lucide-react-native";
import * as React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
export default function EditProfileScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const [firstName, setFirstName] = React.useState("Sarah");
  const [lastName, setLastName] = React.useState("Johnson");
  const [email, setEmail] = React.useState("sarah@example.com");
  const [phone, setPhone] = React.useState("+1 234 567 8900");

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top"]}
    >
      
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerClassName="px-5 pt-8 pb-10"
          keyboardShouldPersistTaps="handled"
        >
            <Pressable
            onPress={() => router.back()}
            hitSlop={10}
            className="mb-6"
          >
            <ArrowLeft
              size={24}
              color={colors.foreground}
            />
          </Pressable>
          {/* Profile Picture Section */}
          <View className="items-center mb-2">
            <View className="relative">
              <View
                className="w-24 h-24 rounded-3xl items-center justify-center"
                style={{ backgroundColor: colors.secondary }}
              >
                <Text
                  className="text-2xl font-bold"
                  style={{ color: colors.primary }}
                >
                  {initials}
                </Text>
              </View>
              <Pressable
                onPress={() => {}}
                hitSlop={8}
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full items-center justify-center border-2"
                style={{
                  backgroundColor: colors.primary,
                  borderColor: colors.card,
                }}
              >
                <Pencil size={14} color={colors.primaryForeground} />
              </Pressable>
            </View>

            <Text
              className="text-sm mt-3 mb-8"
              style={{ color: colors.mutedForeground }}
            >
              Tap to change photo
            </Text>
          </View>

        
          <View className="gap-5">
            <Input
              label="First Name"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />

            <Input
              label="Last Name"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
            />

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="Phone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <Button
            size="lg"
            className="mt-8"
            onPress={() => {}}
          >
            Save Changes
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}