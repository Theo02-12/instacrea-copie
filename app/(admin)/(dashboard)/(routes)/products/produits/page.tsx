import React, { Suspense } from "react";
import ProductTable, { Product } from "@components/ProductTable";
import connectMongoDB from "@lib/mongodb";
import ProductModel from "@models/products";
import { redirect } from "next/navigation";
import Loading from "./loading";

const fetchProducts = async (
  pageNo: number,
  perPage: number
): Promise<Product[]> => {
  const skipCount = (pageNo - 1) * perPage;

  await connectMongoDB();
  const products = await ProductModel.find()
    .sort("-createdAt")
    .skip(skipCount)
    .limit(perPage);

  return products.map((product) => {
    return {
      id: product._id.toString(),
      title: product.title,
      thumbnail: product.thumbnail.url,
      description: product.description,
      price: {
        mrp: product.price.base,
        salePrice: product.price.discounted,
        saleOff: product.sale,
      },
      category: product.category,
      quantity: product.quantity,
    };
  });
};

const product_per_page = 10;

interface Props {
  searchParams: { page: string };
}

const Produits = async ({ searchParams }: Props) => {
  const { page = "1" } = searchParams;

  if (isNaN(+page)) return redirect("/404");

  const products = await fetchProducts(+page, product_per_page);
  let hasMore = true;

  if (products.length < product_per_page) hasMore = false;
  else hasMore = true;

  return (
    <Suspense fallback={<Loading />}>
      <div className="p-5">
        <ProductTable products={products} currentPageNo={+page} />
      </div>
    </Suspense>
  );
};

export default Produits;
