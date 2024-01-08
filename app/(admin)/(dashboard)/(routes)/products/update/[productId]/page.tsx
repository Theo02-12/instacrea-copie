import UpdateProduct from "@components/UpdateProduct";
import connectMongoDB  from "@lib/mongodb";
import ProductModel from "@models/products";
import { ProductResponse } from "../../../../../../types/index";
import { isValidObjectId } from "mongoose";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    productId: string;
  };
}

const fetchProductInfo = async (
  productId: string
): Promise<string> => {
  if (!isValidObjectId(productId)) return redirect("/404");
  await connectMongoDB();

  const product = await ProductModel.findById(productId);
  if (!product) return redirect("/404");

  const finalProduct: ProductResponse = {
    id: product._id.toString(),
    title: product.title,
    thumbnail: product.thumbnail,
    description: product.description,
    price: product.price,
    bulletPoints: product.bulletPoints,
    images: product.images?.map(({ url, id }) => ({ url, id })),
    category: product.category,
    quantity: product.quantity,
  }

  return JSON.stringify(finalProduct)
};

export default async function UpdatePage(props: Props) {
  const { productId } = props.params;
  const product = await fetchProductInfo(productId);

  return <UpdateProduct product={JSON.parse(product)} />;
}
