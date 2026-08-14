import { ScreenHeader } from "@shared/components/ui/screen-header";
import { useTheme } from "@shared/hooks/use-theme";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddAddressFormView } from "../components/AddAddressForm/AddAddressFormView";
import { createAddAddressScreenStyles } from "./addAddressScreen.styles";

export default function AddAddressScreen() {
  const { colors } = useTheme();
  const styles = createAddAddressScreenStyles(colors);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }} edges={["top"]}>
      <ScreenHeader title="Add Address" />

      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <AddAddressFormView />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
