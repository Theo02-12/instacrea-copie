import ReviewForm from "@/app/components/ReviewForm";
import connectMongoDB from "@/app/lib/mongodb";
import ProductModel from "@/app/models/products";
import ReviewModel from "@/app/models/reviewModel";
import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

export const fetchReview = async (productId: string) => {
  const session = await auth();
  if (!session?.user) return redirect("/auth/signin");

  await connectMongoDB();
  const review = await ReviewModel.findOne({
    userId: session.user.id,
    product: productId,
  })
  if (review) {
    return {
      id: review._id.toString(),
      rating: review.rating,
      comment: review.comment,
    };
  }
};

const fetchProductInfos = async (productId: string) => {
  await connectMongoDB();
  const product = await ProductModel.findById(productId);
  if (!product) return redirect("/404");

  return {
    title: product.title,
    thumbnail: product.thumbnail.url,
  };
};

export default async function AddReview({ params }: Props) {
  const productId = params.id;
  const review = await fetchReview(productId);
  const product = await fetchProductInfos(productId);

  const initialValue = review
    ? { rating: review.rating, comment: review.comment || "" }
    : undefined;

  return (
    <div className="p-5">
      <div>
        <div className="flex items-center my-4">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={80}
            height={80}
            className="rounded"
          />
          <h2 className="font-semibold text-xl">{product.title}</h2>
        </div>
      </div>
      <ReviewForm productId={productId} initialValue={initialValue} />
    </div>
  );
}
