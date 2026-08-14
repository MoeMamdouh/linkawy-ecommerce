import { ScreenHeader } from "@shared/components/ui/screen-header";
import { useTheme } from "@shared/hooks/use-theme";
import { useRouter } from "expo-router";
import { MapPin, Plus } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddressCardView } from "../components/AddressCard/AddressCardView";
import { useCustomerAddresses } from "../hooks/useCustomerAddresses";
import { createAddressesScreenStyles } from "./addressesScreen.styles";

export default function AddressesScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createAddressesScreenStyles(colors);
  const { t } = useTranslation();
  const { addresses, loading } = useCustomerAddresses();

  const handleAddAddress = () => {
    router.push("/add-address" as any);
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }} edges={["top"]}>
        <ScreenHeader title="Address List" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }} edges={["top"]}>
      <ScreenHeader title="Address List" />

      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleAddAddress}
          activeOpacity={0.8}
          style={styles.addButton}
        >
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add New Address</Text>
        </TouchableOpacity>

        {addresses.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MapPin size={56} color={colors.mutedForeground} opacity={0.4} />
            <Text style={styles.emptyTitle}>No Addresses Found</Text>
            <Text style={styles.emptySubtitle}>
              Tap the button above to add your first shipping address.
            </Text>
          </View>
        ) : (
          <FlatList
            data={addresses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <AddressCardView address={item} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
