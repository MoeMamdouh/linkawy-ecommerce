import React from "react";
import { ProfileMenuItem as ProfileMenuItemType } from "../types/profile.types";
import { ProfileMenuItem } from "./ProfileMenuItem";

interface ProfileMenuListProps {
  items: ProfileMenuItemType[];
  colorScheme: "light" | "dark";
}

export function ProfileMenuList({ items, colorScheme }: ProfileMenuListProps) {
  return (
    <>
      {items.map((item) => (
        <ProfileMenuItem key={item.key} item={item} colorScheme={colorScheme} />
      ))}
    </>
  );
}