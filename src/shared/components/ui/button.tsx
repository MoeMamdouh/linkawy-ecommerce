import * as React from "react";
import { Pressable, Text, View, type PressableProps, type StyleProp, type TextStyle } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@shared/utils/cn";
import { useColorScheme } from '@shared/hooks/use-color-scheme';
import { Colors } from '@shared/constants/theme';

const buttonVariants = cva(
  "flex-row items-center justify-center rounded-lg transition-all active:opacity-80 shrink-0",
  {
    variants: {
      variant: {
        default: "border border-transparent",
        transparent: "border border-transparent",
        destructive: "border border-red100",
        secondary: "border border-transparent",
        ghost: "border border-transparent",
        link: "bg-transparent border border-transparent",
      },
      size: {
        default: "h-12 w-full px-5 py-2.5 gap-2",
        sm: "h-9 rounded-md px-3 gap-1.5",
        lg: "h-16 rounded-2xl px-7 gap-3",
        icon: "h-12 w-12 rounded-lg p-0 items-center justify-center",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

const buttonTextVariants = cva("text-center ", {
  variants: {
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-lg",
      icon: "text-base",
    },
  },
  defaultVariants: { size: "default" },
});

export interface ButtonProps
  extends PressableProps,
  VariantProps<typeof buttonVariants> {
  className?: string;
  textClassName?: string;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

function getVariantStyle(variant: ButtonProps["variant"], colors: typeof Colors["light"]) {
  switch (variant) {
    case "transparent":
      return { backgroundColor: "transparent" };
    case "destructive":
      return { backgroundColor: colors.destructiveBackground, borderColor: colors.border };
    case "secondary":
      return { backgroundColor: colors.secondary };
    case "ghost":
      return { backgroundColor: colors.inputBackground };
    case "link":
      return { backgroundColor: "transparent" };
    default:
      return { backgroundColor: colors.primary };
  }
}

function getTextColor(variant: ButtonProps["variant"], colors: typeof Colors["light"]) {
  switch (variant) {
    case "transparent":
      return colors.foreground;
    case "destructive":
      return colors.destructive;
    case "ghost":
      return colors.mutedForeground;
    case "secondary":
      return colors.secondaryForeground;
    case "link":
      return colors.primary;
    default:
      return colors.primaryForeground;
  }
}

const Button = React.forwardRef<View, ButtonProps>(
  ({ className, textClassName, textStyle, variant, size, children, disabled, style, ...props }, ref) => {
    const colorScheme = useColorScheme() ?? "light";
    const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

    const userStyle = typeof style === 'function' ? style({ pressed: false } as any) : style;

    return (
      <Pressable
        ref={ref}
        disabled={disabled}
        className={cn(
          buttonVariants({ variant, size }),
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        style={[getVariantStyle(variant, colors), userStyle]}
        {...props}
      >
        {typeof children === "string" ? (
          <Text
            className={cn(buttonTextVariants({ size }), textClassName)}
            style={[{ color: getTextColor(variant, colors) }, textStyle]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </Pressable>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants, buttonTextVariants };