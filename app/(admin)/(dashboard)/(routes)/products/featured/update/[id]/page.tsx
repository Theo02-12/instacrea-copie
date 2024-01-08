import FeaturedProductForm from "@/app/components/FeaturedProductForm";
import connectMongoDB from "@/app/lib/mongodb";
import featuredProductModel from "@/app/models/featuredProducts";
import { isValidObjectId } from "mongoose";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const fetchInitialValue = async (id: string) => {
  if (!isValidObjectId(id)) return redirect("/404");
  await connectMongoDB();

  const product = await featuredProductModel.findById(id);
  if (!product) return redirect("/404");

  const { _id, title, link, linkTitle, banner} = product

  return {
    id: _id.toString(),
    title,
    link,
    linkTitle,
    banner: banner.url
  }
};

export default async function UpdateFeaturedProduct(props: Props) {
  const { id } = props.params;
  const initialValue = await fetchInitialValue(id);

  return <FeaturedProductForm initialValue={initialValue} />;
}
