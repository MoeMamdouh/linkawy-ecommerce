import { ComponentType } from "react";

export interface ProfileUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ProfileStat {
  label: string;
  value: string | number;
}

export interface ProfileMenuItem {
  key: string;
  label: string;
  value?: string;
  Icon: ComponentType<{ size?: number; color?: string }>;
  onPress: () => void;
  isDestructive?: boolean;
}
