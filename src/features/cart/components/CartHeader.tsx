import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../styles/cart-screen.styles';
import { useTheme } from '@shared/hooks/use-theme';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

interface CartHeaderProps {
  totalItemCount: number;
}

export function CartHeader({ totalItemCount }: CartHeaderProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const router = useRouter();

  return (
    <View style={[styles.header, { backgroundColor: colors.card, paddingTop: insets.top + 16 }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <ChevronLeft color={colors.foreground} size={28} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.foreground, marginBottom: 0 }]}>My Cart</Text>
      </View>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
        {totalItemCount} items
      </Text>
    </View>
  );
}
