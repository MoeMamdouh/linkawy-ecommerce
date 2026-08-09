// ──────────────────────────────────────────────
// SearchBar — View
// ──────────────────────────────────────────────

import React, { forwardRef } from 'react';
import { View, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import { Colors } from '@shared/constants/theme';
import { useColorScheme } from '@shared/hooks/use-color-scheme';
import { createSearchBarStyles } from './searchBar.styles';

interface SearchBarViewProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
}

const SearchBarView = forwardRef<TextInput, SearchBarViewProps>(({
  placeholder = 'Search products...',
  onChangeText,
  value,
}, ref) => {
  const theme = useColorScheme() ?? 'light';
  const styles = createSearchBarStyles(theme);
  const colors = Colors[theme];

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Search size={18} color={colors.mutedForeground} />
        <TextInput
          ref={ref}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
});

export default SearchBarView;
