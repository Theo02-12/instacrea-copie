import ProductView from "@/app/components/ProductView";
import RatingStars from "@/app/components/RatingStars";
import SimilarProductsList from "@/app/components/SimilarProductsList";
import UserRating from "@/app/components/UserRating";
import connectMongoDB from "@/app/lib/mongodb";
import ProductModel from "@/app/models/products";
import ReviewModel from "@/app/models/reviewModel";
import WishlistModel from "@/app/models/wishlistModel";
import { auth } from "@/auth";
import { isValidObjectId } from "mongoose";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    product: string[];
  };
}

let isWishlist = false;

const fetchProduct = async (productId: string) => {
  if (!isValidObjectId(productId)) return redirect("/404");

  await connectMongoDB();
  const product = await ProductModel.findById(productId);
  if (!product) return redirect("/404");

  const session = await auth();
  if (session?.user) {
    const wishlist = await WishlistModel.findOne({
      user: session.user.id,
      products: product._id,
    });

    isWishlist = wishlist ? true : false;
  }

  return {
    id: product._id.toString(),
    title: product.title,
    description: product.description,
    thumbnail: product.thumbnail.url,
    images: product.images?.map(({ url }) => url),
    bulletPoints: product.bulletPoints,
    price: product.price,
    sale: product.sale,
    rating: product.rating,
    wishlist: isWishlist,
    outOfStock: product.quantity <= 0,
  };
};

const fetchReview = async (productId: string) => {
  await connectMongoDB();
  if (!isValidObjectId(productId)) return redirect("/404");


  const review = await ReviewModel.find({ product: productId }).populate<{
    user: { firstname: string; lastname: string; avatar: { url: string } };
  }>({
    path: "userId",
    select: "firstname lastname avatar.url",
  });

  if (!review) return redirect("/404");
  return review.map((item) => {
    const user = item.userId as {
      firstname?: string;
      lastname?: string;
      avatar?: { url?: string };
    } | null;
    const comment = item.comment ?? "";

    return {
      rating: item.rating,
      comment: comment,
      date: item.createdAt,
      user: {
        firstname: user?.firstname,
        lastname: user?.lastname,
        avatar: user?.avatar?.url,
      },
    };
  });
};
const fetchSimilarProducts = async () => {
  await connectMongoDB();
  const products = await ProductModel.find().sort({ rating: -1 }).limit(10);
  return products.map(({ _id, thumbnail, title, price }) => {
    return {
      id: _id.toString(),
      title,
      thumbnail: thumbnail.url,
      price: price.discounted,
    };
  });
};

export default async function Product({ params }: Props) {
  const { product } = params;
  const productId = product[1];

  const productInfo = await fetchProduct(productId);
  const review = await fetchReview(productId);
  const similarProducts = await fetchSimilarProducts();

  let productImages = [productInfo.thumbnail];
  if (productInfo.images) {
    productImages = productImages.concat(productInfo.images);
  }
  return (
    <div className="p-4 w-[80%] mx-auto">
      <ProductView
        title={productInfo.title}
        description={productInfo.description}
        price={productInfo.price}
        sale={productInfo.sale}
        points={productInfo.bulletPoints}
        images={productImages}
        wishlist={productInfo.wishlist}
        outOfStock={productInfo.outOfStock}
      />
      <SimilarProductsList products={similarProducts} />
      <div className="my-12">
        <RatingStars value={productInfo.rating!} />
        <div className="flex justify-between my-3">
          <h2 className="font-semibold text-2xl">Avis des clients</h2>
          <Link
            href={`/add-review/${productId}`}
            className="bg-gray-300 p-2 rounded-2xl"
          >
            Ajouter un avis
          </Link>
        </div>
        <div>
          <UserRating rating={review} />
        </div>
      </div>
    </div>
  );
}
