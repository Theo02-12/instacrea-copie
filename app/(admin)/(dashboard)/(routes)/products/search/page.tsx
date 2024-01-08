import ProductTable from "@/app/components/ProductTable";
import connectMongoDB from "@/app/lib/mongodb";
import ProductModel from "@/app/models/products";

import React from "react";

interface Props {
  searchParams: { query: string };
}

const searchProducts = async (query: string) => {
  await connectMongoDB();
  const products = await ProductModel.find({
    title: { $regex: query, $options: "i" },
  });

  const results = products.map(
    ({
      _id,
      description,
      thumbnail,
      category,
      quantity,
      title,
      price,
      sale,
    }) => {
      return {
        id: _id.toString(),
        title,
        thumbnail: thumbnail.url,
        description,
        price: {
          mrp: price.base,
          salePrice: price.discounted,
          saleOff: sale,
        },
        category,
        quantity,
      };
    }
  );

  return JSON.stringify(results);
};

export default async function AdminSearch({ searchParams }: Props) {
  const { query } = searchParams;
  const results = JSON.parse(await searchProducts(query));
  return (
    <div>
      <ProductTable
        products={results}
        showPageNavigator={false}
        currentPageNo={0}
      />
    </div>
  );
}