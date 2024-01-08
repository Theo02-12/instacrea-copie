import connectMongoDB from "@lib/mongodb";
import FeaturedProductsSlider from "@components/FeaturedProductsSlider";
import featuredProductModel from "../models/featuredProducts";
import CategorySlider from "../components/CategorySlider";
import { ProductCardRated } from "../components/productCard/index";
import React, { Suspense } from "react";
import Loading from "./loading";
import { Badge } from "@components/ui/badge";
import Link from "next/link";
import categories from "../tools/categories";

const featuredProductsFetch = async () => {
  await connectMongoDB();
  const featuredProducts = await featuredProductModel.find().sort("-createdAt");

  return featuredProducts.map((product) => {
    return {
      id: product._id.toString(),
      title: product.title,
      link: product.link,
      linkTitle: product.linkTitle,
      banner: product.banner.url,
    };
  });
};

export default async function Home() {
  const featuredProducts = await featuredProductsFetch();
  return (
    <Suspense fallback={<Loading />}>
      <div className="py-14 space-y-4 w-[95%] md:w-[80%] mx-auto">
        <FeaturedProductsSlider products={featuredProducts} />
        <div className="2xl:flex 2xl:justify-center">

        <CategorySlider>
          {categories.map((cat, i) => {
            return (
              <div key={i} style={{userSelect: 'none'}} className="px-5 me-3 whitespace-nowrap border border-[#744906] text-[#744906] uppercase font-bold rounded">
                  <Link className="w-full" href={`/browse-category/${cat}`} >
                  <Badge>{cat}</Badge>
              </Link>              
                </div>
            );
          })}
        </CategorySlider>
          </div>
          <div>
              <ProductCardRated />
          </div>
      </div>
    </Suspense>
  );
}
