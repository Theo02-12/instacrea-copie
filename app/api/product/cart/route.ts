import connectMongoDB from "@/app/lib/mongodb";
import CartModel from "@/app/models/cartModel";
import { NewCartRequest } from "@/app/types";
import { auth } from "@/auth";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user)
      return NextResponse.json(
        { error: "accès non authorisé" },
        { status: 401 }
      );

    const { productId, quantity } = (await req.json()) as NewCartRequest;

    if (!isValidObjectId(productId) || isNaN(quantity))
      return NextResponse.json({ error: "Invalid request" }, { status: 401 });

    await connectMongoDB();

    const cart = await CartModel.findOne({ userId: user.id });
    if (!cart) {
      await CartModel.create({
        userId: user.id,
        items: [{ productId, quantity }],
      });
      return NextResponse.json({ success: true });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      // modifier la quantité si article déjà présent dans le panier
      existingItem.quantity += quantity;
      // retirer article si la quantité est égale à 0
      if (existingItem.quantity <= 0) {
        cart.items = cart.items.filter(
          (item) => item.productId.toString() !== productId
        );
      }
    } else {
      // ajouter un nouvel article si il existe pas
      cart.items.push({ productId: productId as any, quantity });
    }

    await cart.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as any).message },
      { status: 500 }
    );
  }
};
