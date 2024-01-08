import FeaturedProductForm from "@/app/components/FeaturedProductForm";
import FeaturedProductTable from "@/app/components/FeaturedProductTable";
import connectMongoDB from "@/app/lib/mongodb";
import featuredProductModel from "@/app/models/featuredProducts";
import React from "react";

const fetchFeaturedProduct = async () => {
  await connectMongoDB();
  const featuredProduct = await featuredProductModel.find().sort("-createdAt");
  if (!featuredProduct) return null;
  return featuredProduct.map((product) => {
    return {
      id: product._id.toString(),
      title: product.title,
      link: product.link,
      linkTitle: product.linkTitle,
      banner: product.banner.url,
    };
  });
};

export default async function AddFeaturedProduct() {
  const featuredProduct = await fetchFeaturedProduct();
  return (
    <>
      <FeaturedProductForm />
      <div>
        <FeaturedProductTable products={featuredProduct || []} />
      </div>
    </>
  );
}
