import { AlertCircle, X } from "lucide-react-native";
import { useEffect } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { FontFamily, FontSize } from "@shared/constants/theme";
import { useTheme } from "@shared/hooks/use-theme";

interface ErrorModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string | null;
  buttonText?: string;
}

export function ErrorModal({
  visible,
  onClose,
  title = "Something went wrong",
  message,
  buttonText = "OK",
}: ErrorModalProps) {
  const { colors } = useTheme();

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 200 });
      scale.value = withTiming(1, { duration: 200 });
    } else {
      opacity.value = withTiming(0, { duration: 150 });
      scale.value = withTiming(0.9, { duration: 150 });
    }
  }, [visible, opacity, scale]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  if (!message) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Animated.View
        style={[
          backdropStyle,
          { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
        ]}
      >
        <Pressable
          className="flex-1 items-center justify-center px-6"
          onPress={onClose}
        >
          {/* stopPropagation so tapping the card itself doesn't close it */}
          <Pressable onPress={(e) => e.stopPropagation()}>
            <Animated.View
              style={[
                cardStyle,
                {
                  backgroundColor: colors.background,
                  borderRadius: 16,
                  padding: 24,
                  width: 300,
                  alignItems: "center",
                  gap: 12,
                },
              ]}
            >
              <Pressable
                onPress={onClose}
                className="absolute top-3 right-3 p-1"
                hitSlop={8}
              >
                <X size={18} color={colors.mutedForeground} />
              </Pressable>

              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: colors.destructive + "20",
                }}
              >
                <AlertCircle size={26} color={colors.destructive} />
              </View>

              <Text
                style={{
                  color: colors.foreground,
                  fontFamily: FontFamily.bold,
                  fontSize: FontSize.md,
                  textAlign: "center",
                }}
              >
                {title}
              </Text>

              <Text
                style={{
                  color: colors.mutedForeground,
                  fontFamily: FontFamily.regular,
                  fontSize: FontSize.sm,
                  textAlign: "center",
                }}
              >
                {message}
              </Text>

              <Pressable
                onPress={onClose}
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                  paddingVertical: 10,
                  width: "100%",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <Text
                  style={{
                    color: colors.primaryForeground,
                    fontFamily: FontFamily.bold,
                    fontSize: FontSize.sm,
                  }}
                >
                  {buttonText}
                </Text>
              </Pressable>
            </Animated.View>
          </Pressable>
        </Pressable>
      </Animated.View>
    </Modal>
  );
}