import { useEditProfile } from "@features/profile/hooks/useEditProfile";
import { useTheme } from "@shared/hooks/use-theme";
import { Pencil } from "lucide-react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createEditProfileFormStyles } from "./editProfileForm.styles";

interface EditProfileFormViewProps {
  initialFirstName?: string;
  initialLastName?: string;
  initialEmail?: string;
  initialPhone?: string;
}

export function EditProfileFormView({
  initialFirstName = "",
  initialLastName = "",
  initialEmail = "",
  initialPhone = "",
}: EditProfileFormViewProps) {
  const { colors } = useTheme();
  const styles = createEditProfileFormStyles(colors);
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);

  const { updateProfile, loading, errorMessage, successMessage } = useEditProfile();

  const handleSave = async () => {
    await updateProfile({
      firstName,
      lastName,
      email,
      phone,
    });
  };

  const initials = `${firstName?.[0] || "U"}${lastName?.[0] || ""}`.toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <View style={styles.avatarBox}>
          <Text style={styles.avatarText}>{initials}</Text>
          <View style={styles.editBadge}>
            <Pencil size={12} color="#FFFFFF" />
          </View>
        </View>
      </View>

      {!!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      {successMessage && (
        <Text style={styles.successText}>Profile updated successfully!</Text>
      )}

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>First Name</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor={colors.mutedForeground}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Last Name</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor={colors.mutedForeground}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={colors.mutedForeground}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Phone Number</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          placeholderTextColor={colors.mutedForeground}
        />
      </View>

      <TouchableOpacity
        onPress={handleSave}
        disabled={loading}
        activeOpacity={0.8}
        style={styles.saveButton}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.saveButtonText}>Save Changes</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
