import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Tag, Check, X } from 'lucide-react-native';
import { Colors, Palette, FontFamily, FontSize } from '@shared/constants/theme';
import { useColorScheme } from '@shared/hooks/use-color-scheme';
import { Button } from '@shared/components/ui/button';
import { AppliedPromo } from '../hooks/useCart';
import { styles } from '../styles/cart-screen.styles';

interface CartPromoInputProps {
  promoCode: string;
  setPromoCode: (code: string) => void;
  appliedPromo: AppliedPromo | null;
  promoError: string | null;
  onApply: (code: string) => void;
  onRemove: () => void;
}

export function CartPromoInput({
  promoCode,
  setPromoCode,
  appliedPromo,
  promoError,
  onApply,
  onRemove,
}: CartPromoInputProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={styles.promoContainer}>
      {appliedPromo ? (
        <View
          style={[
            styles.appliedPromoBox,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.appliedPromoContent}>
            <View style={[styles.promoIconCircle, { backgroundColor: colors.primary }]}>
              <Check size={14} color={Palette.white} />
            </View>
            <View>
              <Text style={[styles.appliedPromoCode, { color: colors.foreground }]}>
                {appliedPromo.code}
              </Text>
              <Text style={[styles.appliedPromoDiscount, { color: Palette.green500 }]}>
                {appliedPromo.discountPercent}% OFF Applied
              </Text>
            </View>
          </View>
          <Pressable onPress={onRemove} style={styles.removePromoButton} hitSlop={8}>
            <X size={18} color={colors.mutedForeground} />
          </Pressable>
        </View>
      ) : (
        <View>
          {/* Separated Input Field and Apply Button side-by-side */}
          <View style={styles.promoRow}>
            <View
              style={[
                styles.promoInputWrapper,
                {
                  backgroundColor: colors.card,
                  borderColor: promoError ? Palette.red500 : colors.border,
                },
              ]}
            >
              <Tag size={18} color={colors.mutedForeground} style={styles.promoTagIcon} />
              <TextInput
                style={[
                  styles.promoTextInput,
                  {
                    color: colors.foreground,
                    fontFamily: FontFamily.regular,
                    fontSize: FontSize.sm,
                  },
                ]}
                placeholder="Promo code"
                placeholderTextColor={colors.mutedForeground}
                value={promoCode}
                onChangeText={setPromoCode}
                autoCapitalize="characters"
                autoCorrect={false}
              />
            </View>
            <Button
              variant="default"
              textStyle={{
                fontFamily: FontFamily.bold,
                fontSize: FontSize.sm,
              }}
              onPress={() => onApply(promoCode)}
              style={styles.applyBtn}
            >
              Apply
            </Button>
          </View>
          {promoError ? (
            <Text style={[styles.promoErrorText, { color: Palette.red500 }]}>{promoError}</Text>
          ) : null}
        </View>
      )}
    </View>
  );
}
