import { ComponentType } from "react";

export interface ProfileUser {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
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

export interface OrderLineItem {
  title: string;
  quantity: number;
  image?: string;
  price?: string;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  status: string;
  total: string;
  currencyCode: string;
  items: OrderLineItem[];
}

export interface UserAddress {
  id: string;
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  zip?: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}
