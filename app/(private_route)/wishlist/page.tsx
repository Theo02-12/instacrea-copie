import { WishListItem } from "@components/WishListItem";
import connectMongoDB from "@lib/mongodb";
import WishlistModel from "@models/wishlistModel";
import { auth } from "@/auth";
import { ObjectId } from "mongoose";
import { redirect } from "next/navigation";
import React from "react";

const getWishlist = async () => {
  const session = await auth();
  if (!session?.user) return redirect("auth/signin");
  await connectMongoDB();
  const wishItem = await WishlistModel.findOne<{
    products: [
      {
        _id: ObjectId;
        title: string;
        price: { discounted: number };
        thumbnail: { url: string };
      }
    ];
  }>({
    user: session.user.id,
  }).populate({
    path: "products",
    select: "title thumbnail.url price.discounted",
  });

  return wishItem?.products.map(({ title, price, _id, thumbnail }) => {
    return {
      id: _id.toString(),
      title: title,
      thumbnail: thumbnail.url,
      price: price.discounted,
    };
  });
};

export default async function WishlistPage() {
  const wishList = await getWishlist();
  return (
    <div className="px-12 py-5 min-h-[50vh]">
      <p className="font-bold text-2xl">Mes coups de coeur:</p>
      {wishList?.length! > 0 ?  wishList?.map((product: { id: string; title: string; thumbnail: string; price: number; }) => {
        return (
          <div key={product.id} className="my-3">
              <WishListItem products={product!} />
          </div>
        );
      }) : <p className="text-2xl my-3 text-gray-400">Aucun article</p>}
    </div>
  );
}
