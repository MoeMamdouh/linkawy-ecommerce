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
  const { t, i18n } = useTranslation();
  const isRTL = (i18n.language || "en").startsWith("ar");

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
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

  const textAlignStyle = { textAlign: isRTL ? ("right" as const) : ("left" as const) };

  return (
    <View style={styles.container}>
      {!!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <View style={styles.fieldGroup}>
        <Text style={[styles.fieldLabel, textAlignStyle]}>
          {t("profile.streetAddress", { defaultValue: "Street Address *" })}
        </Text>
        <TextInput
          value={address1}
          onChangeText={setAddress1}
          style={[styles.input, textAlignStyle]}
          placeholder="123 Main St"
          placeholderTextColor={colors.mutedForeground}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={[styles.fieldLabel, textAlignStyle]}>
          {t("profile.apartment", { defaultValue: "Apartment, Suite, Unit (Optional)" })}
        </Text>
        <TextInput
          value={address2}
          onChangeText={setAddress2}
          style={[styles.input, textAlignStyle]}
          placeholder="Apt 4B"
          placeholderTextColor={colors.mutedForeground}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={[styles.fieldLabel, textAlignStyle]}>
          {t("profile.city", { defaultValue: "City *" })}
        </Text>
        <TextInput
          value={city}
          onChangeText={setCity}
          style={[styles.input, textAlignStyle]}
          placeholder="New York"
          placeholderTextColor={colors.mutedForeground}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={[styles.fieldLabel, textAlignStyle]}>
          {t("profile.state", { defaultValue: "State / Province (Optional)" })}
        </Text>
        <TextInput
          value={province}
          onChangeText={setProvince}
          style={[styles.input, textAlignStyle]}
          placeholder="NY"
          placeholderTextColor={colors.mutedForeground}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={[styles.fieldLabel, textAlignStyle]}>
          {t("profile.zip", { defaultValue: "ZIP / Postal Code (Optional)" })}
        </Text>
        <TextInput
          value={zip}
          onChangeText={setZip}
          style={[styles.input, textAlignStyle]}
          placeholder="10001"
          keyboardType="numeric"
          placeholderTextColor={colors.mutedForeground}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={[styles.fieldLabel, textAlignStyle]}>
          {t("profile.country", { defaultValue: "Country *" })}
        </Text>
        <TextInput
          value={country}
          onChangeText={setCountry}
          style={[styles.input, textAlignStyle]}
          placeholder="United States"
          placeholderTextColor={colors.mutedForeground}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={[styles.fieldLabel, textAlignStyle]}>
          {t("profile.phoneOptional", { defaultValue: "Phone Number (Optional)" })}
        </Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={[styles.input, textAlignStyle]}
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
          <Text style={styles.submitButtonText}>
            {t("profile.saveAddress", { defaultValue: "Save Address" })}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
