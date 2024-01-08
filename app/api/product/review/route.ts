import connectMongoDB from "@/app/lib/mongodb";
import ProductModel from "@/app/models/products";
import ReviewModel from "@/app/models/reviewModel";
import { ReviewRequestBody } from "@/app/types";
import { auth } from "@/auth";
import { Types, isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const session = await auth();
    if (!session?.user)
      return NextResponse.json({ error: "must be logged" }, { status: 401 });

    const { productId, rating, comment } =
      (await req.json()) as ReviewRequestBody;
    if (!isValidObjectId(productId)) {
      return NextResponse.json(
        { error: "invalid product id" },
        { status: 401 }
      );
    }

    if (rating < 0 || rating > 5)
      return NextResponse.json({ error: "invalid rating" }, { status: 401 });

    const userId = session.user.id;

    const data = {
      userId,
      product: productId,
      rating,
      comment,
    };

    await connectMongoDB();
    await ReviewModel.findOneAndUpdate({ userId, product: productId }, data, {
      upsert: true,
    });

    await updateRatingProduct(productId);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

const updateRatingProduct = async (productId: string) => {
  const [result] = await ReviewModel.aggregate([
    {
      $match: { product: new Types.ObjectId(productId) },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  if (result?.averageRating) {
    await ProductModel.findByIdAndUpdate(productId, {
      rating: result.averageRating,
    });
  }
};
