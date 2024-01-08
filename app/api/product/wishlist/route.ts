import connectMongoDB from "@/app/lib/mongodb";
import WishlistModel from "@/app/models/wishlistModel";
import { auth } from "@/auth";
import { ObjectId, isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

interface Wishlist {
  productId: ObjectId[];
}
export const POST = async (req: Request) => {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ errror: "Must be logged" }, { status: 401 });
    }

    const { productId } = (await req.json()) as Wishlist;
    if (!isValidObjectId(productId)) {
      return NextResponse.json(
        { error: "invalid product / user id" },
        { status: 401 }
      );
    }

    await connectMongoDB();
    const wishlist = await WishlistModel.findOne({
      user: session.user.id,
      products: productId,
    });

    if (wishlist) {
      await WishlistModel.findOneAndUpdate(wishlist._id, {
        $pull: { products: productId },
      });
    } else {
      await WishlistModel.findOneAndUpdate(
        { user: session.user.id },
        {
          user: session.user.id,
          $push: { products: productId },
        },
        { upsert: true }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
