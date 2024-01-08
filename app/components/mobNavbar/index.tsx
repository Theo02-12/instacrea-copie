import React from "react";
import MobNavbar from "./MobNavbar";
import { fetchUserProfile } from "@/app/(private_route)/profil/page";
import { fetchQuantity } from "../navbar";

export default async function MobileNavBar() {
  const profile = await fetchUserProfile();
  const cartItem = await fetchQuantity()
  return <MobNavbar cartItems={cartItem ? cartItem.totalQty : 0} src={profile.avatar!} />;
}
