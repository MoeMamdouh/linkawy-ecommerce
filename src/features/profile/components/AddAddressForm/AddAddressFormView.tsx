import { useAddAddress } from "@features/profile/hooks/useAddAddress";
import { useTheme } from "@shared/hooks/use-theme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createAddAddressFormStyles } from "./addAddressForm.styles";

export function AddAddressFormView() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createAddAddressFormStyles(colors);
  const { t } = useTranslation();

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("United States");
  const [phone, setPhone] = useState("");

  const { addAddress, loading, errorMessage } = useAddAddress();

  const handleSubmit = async () => {
    const success = await addAddress({
      address1,
      address2,
      city,
      province,
      zip,
      country,
      phone,
    });

    if (success) {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      {!!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Street Address</Text>
        <TextInput
          value={address1}
          onChangeText={setAddress1}
          style={styles.input}
          placeholder="123 Main St"
          placeholderTextColor={colors.mutedForeground}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Apartment, Suite, Unit (Optional)</Text>
        <TextInput
          value={address2}
          onChangeText={setAddress2}
          style={styles.input}
          placeholder="Apt 4B"
          placeholderTextColor={colors.mutedForeground}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>City</Text>
        <TextInput
          value={city}
          onChangeText={setCity}
          style={styles.input}
          placeholder="New York"
          placeholderTextColor={colors.mutedForeground}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>State / Province</Text>
        <TextInput
          value={province}
          onChangeText={setProvince}
          style={styles.input}
          placeholder="NY"
          placeholderTextColor={colors.mutedForeground}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>ZIP / Postal Code</Text>
        <TextInput
          value={zip}
          onChangeText={setZip}
          style={styles.input}
          placeholder="10001"
          keyboardType="numeric"
          placeholderTextColor={colors.mutedForeground}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Country</Text>
        <TextInput
          value={country}
          onChangeText={setCountry}
          style={styles.input}
          placeholder="United States"
          placeholderTextColor={colors.mutedForeground}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Phone Number (Optional)</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          placeholder="+1 555 123 4567"
          keyboardType="phone-pad"
          placeholderTextColor={colors.mutedForeground}
        />
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading}
        activeOpacity={0.8}
        style={styles.submitButton}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.submitButtonText}>Save Address</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
