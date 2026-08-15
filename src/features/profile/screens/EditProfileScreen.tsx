import { useCustomerProfile } from "@features/customer/hooks/useCustomer";
import { ScreenHeader } from "@shared/components/ui/screen-header";
import { useTheme } from "@shared/hooks/use-theme";
import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EditProfileFormView } from "../components/EditProfileForm/EditProfileFormView";
import { createEditProfileScreenStyles } from "./editProfileScreen.styles";

export default function EditProfileScreen() {
  const { colors } = useTheme();
  const styles = createEditProfileScreenStyles(colors);
  const { t } = useTranslation();
  const { data, loading } = useCustomerProfile();

  const customer = data?.customer;

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }} edges={["top"]}>
        <ScreenHeader title={t("profile.editProfile", { defaultValue: "Edit Profile" })} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }} edges={["top"]}>
      <ScreenHeader title={t("profile.editProfile", { defaultValue: "Edit Profile" })} />

      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <EditProfileFormView
            initialFirstName={customer?.firstName || ""}
            initialLastName={customer?.lastName || ""}
            initialEmail={customer?.email || ""}
            initialPhone={customer?.phone || ""}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
