import { LucideIcon } from "lucide-react-native";

export interface ProfileStat {
  label: string;
  value: string;
}

export interface ProfileMenuItem {
  key: string;
  label: string;
  value: string;
  Icon: LucideIcon;
  onPress: () => void;
}