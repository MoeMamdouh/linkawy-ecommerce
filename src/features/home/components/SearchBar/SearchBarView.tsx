// ──────────────────────────────────────────────
// SearchBar — View
// ──────────────────────────────────────────────

import { useTheme } from '@shared/hooks/use-theme';
import { Search } from 'lucide-react-native';
import React, { forwardRef } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { createSearchBarStyles } from './searchBar.styles';

interface SearchBarViewProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  editable?: boolean;
  autoFocus?: boolean;
  onPress?: () => void;
  containerBackground?: string;
  embedded?: boolean;
}

const SearchBarView = forwardRef<TextInput, SearchBarViewProps>(({
  placeholder = 'Search products...',
  onChangeText,
  value,
  editable = true,
  autoFocus = false,
  onPress,
  containerBackground,
  embedded = false,
}, ref) => {
  const { colors } = useTheme();
  const styles = createSearchBarStyles(colors, containerBackground, embedded);

  const input = (
    <View style={styles.inputContainer}>
      <Search size={18} color={colors.mutedForeground} />
      <TextInput
        ref={ref}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        autoFocus={autoFocus}
        pointerEvents={editable ? 'auto' : 'none'}
      />
    </View>
  );

  if (!editable && onPress) {
    return (
      <View style={styles.container}>
        <Pressable onPress={onPress} accessibilityRole="search">
          {input}
        </Pressable>
      </View>
    );
  }

  return <View style={styles.container}>{input}</View>;
});

SearchBarView.displayName = 'SearchBarView';

export default SearchBarView;
