import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MapPin, Plus, Check } from 'lucide-react-native';
import { useTheme } from '@shared/hooks/use-theme';
import { createCheckoutStyles } from '../styles/checkout.styles';
import { UserAddress } from '@features/profile/types/profile.types';

interface AddressSectionProps {
  customerName: string;
  addresses: UserAddress[];
  selectedAddressId: string | null;
  onSelectAddress: (id: string) => void;
  onAddAddress: () => void;
  loading?: boolean;
}

export function AddressSection({
  customerName,
  addresses,
  selectedAddressId,
  onSelectAddress,
  onAddAddress,
  loading = false,
}: AddressSectionProps) {
  const { colors } = useTheme();
  const styles = createCheckoutStyles(colors);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeaderRow}>
        <View style={styles.sectionHeaderTitleGroup}>
          <MapPin size={18} color={colors.primary} />
          <Text style={styles.sectionTitle}>Delivery Address</Text>
        </View>

        {addresses.length > 0 && (
          <TouchableOpacity
            style={styles.headerAddButton}
            onPress={onAddAddress}
            activeOpacity={0.7}
          >
            <Plus size={16} color={colors.primary} />
            <Text style={styles.headerAddButtonText}>Add New</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading && addresses.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      ) : addresses.length === 0 ? (
        <View style={styles.noAddressesContainer}>
          <Text style={styles.noAddressesText}>
            No saved addresses found. Please add a shipping address.
          </Text>
          <TouchableOpacity
            style={styles.addAddressButton}
            onPress={onAddAddress}
            activeOpacity={0.8}
          >
            <Plus size={18} color={colors.primary} />
            <Text style={styles.addAddressButtonText}>Add Shipping Address</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.addressList}>
          {addresses.map((item) => {
            const isSelected = item.id === selectedAddressId;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.addressCard,
                  isSelected && styles.addressCardActive,
                ]}
                activeOpacity={0.7}
                onPress={() => onSelectAddress(item.id)}
              >
                <View style={styles.addressRadioGroup}>
                  <View
                    style={[
                      styles.radioCircle,
                      isSelected && styles.radioCircleActive,
                    ]}
                  >
                    {isSelected && <View style={styles.radioDot} />}
                  </View>

                  <View style={styles.addressInfo}>
                    <View style={styles.addressTitleRow}>
                      <Text style={styles.addressName}>
                        {customerName || 'Customer'}
                      </Text>
                      {item.isDefault && (
                        <View style={styles.defaultBadge}>
                          <Text style={styles.defaultBadgeText}>DEFAULT</Text>
                        </View>
                      )}
                    </View>

                    <Text style={styles.addressText}>
                      {[item.address1, item.address2].filter(Boolean).join(', ')}
                    </Text>
                    <Text style={styles.addressText}>
                      {[item.city, item.province, item.zip, item.country]
                        .filter(Boolean)
                        .join(', ')}
                    </Text>
                    {item.phone ? (
                      <Text style={styles.addressPhoneText}>
                        Phone: {item.phone}
                      </Text>
                    ) : null}
                  </View>
                </View>

                {isSelected && (
                  <View style={styles.selectedCheckBadge}>
                    <Check size={16} color={colors.primary} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}
