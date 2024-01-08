import connectMongoDB from "@/app/lib/mongodb";
import CartModel from "@/app/models/cartModel";
import { auth } from "@/auth";
import CartItems from "@components/CartItems";
import { Types } from "mongoose";
import Image from "next/image";
import React from "react";

export const fetchCartProducts = async () => {
  const session = await auth();
  if (!session?.user) return null;

  await connectMongoDB();
  const [cartItems] = await CartModel.aggregate([
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
        id: { $toString: "$_id" },
        totalQty: { $sum: "$items.quantity" },
        products: {
          id: { $toString: { $arrayElemAt: ["$product._id", 0] } },
          thumbnail: { $arrayElemAt: ["$product.thumbnail.url", 0] },
          title: { $arrayElemAt: ["$product.title", 0] },
          price: { $arrayElemAt: ["$product.price.discounted", 0] },
          qty: "$items.quantity",
          totalPrice: {
            $multiply: [
              "$items.quantity",
              { $arrayElemAt: ["$product.price.discounted", 0] },
            ],
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        id: { $first: "$id" },
        totalQty: { $sum: "$totalQty" },
        totalPrice: { $sum: "$products.totalPrice" },
        products: { $push: "$products" },
      },
    },
    {
      $project: {
        _id: 0,
        id: 1,
        totalQty: 1,
        totalPrice: 1,
        products: 1,
      },
    },
  ]);
  return cartItems;
};
export default async function Cart() {
  const cart = await fetchCartProducts();

  if (!cart)
    return (
      <div>
        <div>
          <h1 className="text-2xl text-center md:text-start font-bold py-2 px-5 border-b">
            Détails de votre panier
          </h1>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center my-10">
          <h1 className="font-semibold">Votre panier est vide !</h1>
          <Image
            src={"https://imgur.com/dCdflKN.png"}
            width={100}
            height={100}
            alt="https://imgur.com/dCdflKN"
          />
        </div>
      </div>
    );
  return (
    <div className="px-2 md:p-0 md:w-5/6 mx-auto border-b py-5">
      <h1 className="text-center text-2xl font-bold py-2 border-b md:border-none">Votre panier :</h1>
      <CartItems
        products={cart.products}
        cartTotal={cart.totalPrice}
        totalQty={cart.totalQty}
        cartId={cart.id}
      />
    </div>
  );
}
