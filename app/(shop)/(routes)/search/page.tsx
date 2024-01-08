import GridView from "@/app/components/GridView";
import SearchFilter from "@/app/components/SearchFilter";
import ProductCard, { Product } from "@/app/components/productCard/ProductCard";
import connectMongoDB from "@/app/lib/mongodb";
import ProductModel, { ProductDocument } from "@/app/models/products";
import { FilterQuery } from "mongoose";
import React from "react";

type options = {
  query: string;
  priceSort?: "asc" | "desc";
  maxRating?: number;
  minRating?: number;
};
interface Props {
  searchParams: options;
}

const fetchSearchResult = async (options: options) => {
  const { query, minRating, maxRating, priceSort } = options;

  await connectMongoDB();
  const filter: FilterQuery<ProductDocument> = {
    title: { $regex: query, $options: "i" },
  };

  if (typeof minRating === "number" && typeof maxRating === "number") {
    const minCondition = minRating >= 0;
    const maxCondition = maxRating <= 5;

    if (minCondition && maxCondition) {
      filter.rating = { $gte: minRating, $lte: maxRating };
    }
  }

  const search = await ProductModel.find({ ...filter }).sort({
    "price.discounted": priceSort === "asc" ? 1 : -1,
  });

  if (!search) return null;

  const result = search.map(
    ({ _id, title, description, thumbnail, price, category, sale, rating }) => {
      return {
        id: _id.toString(),
        title,
        thumbnail: thumbnail.url,
        description,
        price: {
          base: price.base,
          discounted: price.discounted,
        },
        sale,
        category,
        rating,
      };
    }
  );
  return result;
};

export default async function page({ searchParams }: Props) {
  const { maxRating, minRating } = searchParams;
  const result = (await fetchSearchResult({
    ...searchParams,
    maxRating: maxRating ? +maxRating : undefined,
    minRating: minRating ? +minRating : undefined,
  })) as Product[];
  return (
    <>
      <div>
        <SearchFilter>
          {!result?.length ? (
            <p className="text-2xl">
              Aucun produit trouvé !
            </p>
          ) : (
            <GridView>
              {result?.map((product) => {
                return (
                  <ProductCard
                    value={product.rating}
                    key={product.id}
                    product={product}
                  />
                );
              })}
            </GridView>
          )}
        </SearchFilter>
      </div>
    </>
  );
}
