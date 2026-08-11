import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../styles/cart-screen.styles';
import { useTheme } from '@shared/hooks/use-theme';

interface CartHeaderProps {
  totalItemCount: number;
}

export function CartHeader({ totalItemCount }: CartHeaderProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { backgroundColor: colors.card, paddingTop: insets.top + 16 }]}>
      <Text style={[styles.title, { color: colors.foreground }]}>My Cart</Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
        {totalItemCount} items
      </Text>
    </View>
  );
}
