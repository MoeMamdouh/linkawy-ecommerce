import * as React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  type TextInputProps,
} from "react-native";
import { cn } from "@shared/utils/cn";
import { useColorScheme } from "@shared/hooks/use-color-scheme";
import { Colors } from "@shared/constants/theme";
import { Eye, EyeOff } from "lucide-react-native";

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  type?: "text" | "password";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  (
    {
      className,
      containerClassName,
      inputClassName,
      labelClassName,
      errorClassName,
      type = "text",
      label,
      error,
      leftIcon,
      rightIcon,
      secureTextEntry,
      editable = true,
      ...props
    },
    ref
  ) => {
    const colorScheme = useColorScheme() ?? "light";
    const colors = Colors[colorScheme];

    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const isPasswordType = type === "password" || secureTextEntry;
    const shouldHideText = isPasswordType && !isPasswordVisible;

    // Helper to inject colors.textMuted into icons if not explicitly set
    const renderMutedIcon = (icon: React.ReactNode) => {
      if (React.isValidElement(icon)) {
        return React.cloneElement(icon as React.ReactElement<{ color?: string }>, {
          color: (icon.props as { color?: string }).color ?? colors.textMuted,
        });
      }
      return icon;
    };

    return (
      <View className={cn("w-full", containerClassName)}>
        {label && (
          <Text
            className={cn(
              "text-[11px] font-bold uppercase tracking-widest mb-1.5",
              labelClassName
            )}
            style={{ color: colors.textMuted }}
          >
            {label}
          </Text>
        )}

        <View
          className={cn(
            "flex-row items-center rounded-2xl px-4 py-2 gap-3",
            className
          )}
          style={{
            backgroundColor: colors.inputBackground,
            borderColor: error ? colors.danger : colors.border,
          }}
        >
          {leftIcon && (
            <View className="items-center justify-center">
              {renderMutedIcon(leftIcon)}
            </View>
          )}

          <TextInput
            ref={ref}
            editable={editable}
            secureTextEntry={shouldHideText}
            placeholderTextColor={colors.textMuted}
            style={{ color: colors.foreground }}
            className={cn("flex-1 text-sm outline-none", inputClassName)}
            {...props}
          />

          {isPasswordType ? (
            <Pressable
              onPress={() => setIsPasswordVisible((prev) => !prev)}
              hitSlop={8}
              className="items-center justify-center p-1"
            >
              {isPasswordVisible ? (
                <EyeOff size={20} color={colors.textMuted} />
              ) : (
                <Eye size={20} color={colors.textMuted} />
              )}
            </Pressable>
          ) : rightIcon ? (
            <View className="items-center justify-center">
              {renderMutedIcon(rightIcon)}
            </View>
          ) : null}
        </View>

        {error && (
          <Text
            style={{ color: colors.danger }}
            className={cn("text-xs mt-1 font-medium", errorClassName)}
          >
            {error}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";

export { Input };