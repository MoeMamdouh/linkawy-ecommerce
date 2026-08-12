// ──────────────────────────────────────────────
// SearchBar — View
// ──────────────────────────────────────────────

import { useTheme } from '@shared/hooks/use-theme';
import { Search } from 'lucide-react-native';
import React, { forwardRef } from 'react';
import { TextInput, View } from 'react-native';
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

  const { colors } = useTheme();
  const styles = createSearchBarStyles(colors);

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

// Add display name for better debugging and React DevTools
SearchBarView.displayName = 'SearchBarView';

export default SearchBarView;
