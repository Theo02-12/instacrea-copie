import React from "react";
import NavUI from "./NavUI";
import { auth } from "@/auth";
import CartModel from "@/app/models/cartModel";
import { Types } from "mongoose";
import { fetchUserProfile } from "@/app/(private_route)/profil/page";

export const fetchQuantity = async () => {
  const session = await auth();
  if (!session?.user) return null;

  const [cartQty] = await CartModel.aggregate([
    { $match: { userId: new Types.ObjectId(session.user.id) } },
    { $unwind: "$items" },
    {
      $lookup: {
        from: "products",
        foreignField: "_id",
        localField: "items.productId",
        as: "product",
      },
    },
    {
      $project: {
        _id: 0,
        id: "$_id",
        totalQty: { $sum: "$items.quantity" },
      },
    },
    {
      $group: {
        _id: "$id",
        totalQty: { $sum: "$totalQty" },
      },
    },
  ]);
  return cartQty;
};

export default async function Navbar() {
  const cartItems = await fetchQuantity();
  const profile = await fetchUserProfile();
  return (
    <>
      <NavUI
        src={profile.avatar!}
        cartItems={cartItems ? cartItems.totalQty : 0}
      />
    </>
  );
}
