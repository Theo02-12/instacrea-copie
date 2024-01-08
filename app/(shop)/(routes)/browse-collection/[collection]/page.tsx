import React from "react";
import connectMongoDB from "@lib/mongodb";
import ProductModel from "@/app/models/products";
import ProductCard from "@components/productCard/ProductCard";
import { fetchCartProducts } from "@/app/(shop)/(routes)/cart/page";
import { lastestProducts } from "@components/productCard/index";
import GridView from "@/app/components/GridView";

export const fetchLatestProducts = async (collection: string) => {
  await connectMongoDB();
  const products = await ProductModel.find({ collections: collection }).sort(
    "-createdAt"
  );

  const productList = products.map((product) => {
    return {
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      category: product.category,
      thumbnail: product.thumbnail.url,
      price: product.price,
      sale: product.sale,
      rating: product.rating,
    };
  });
  return JSON.stringify(productList);
};
interface Props {
  params: { collection: string };
}
const Hommes = async ({ params }: Props) => {
  const fetchedCart = await fetchCartProducts();
  const decoded =
    params.collection.charAt(0).toUpperCase() + params.collection.slice(1);
  const lastestProducts = await fetchLatestProducts(decoded);
  const parsedProduct = JSON.parse(lastestProducts) as lastestProducts[];
  return (
    <div className="w-full flex flex-col p-5">
      <p className="text-2xl uppercase">{params.collection}</p>
      <GridView>
        {parsedProduct.length > 0 ? (
          parsedProduct.map((product) => {
            return (
              <div
                key={product.id}
                className={`my-4 ${
                  parsedProduct.length === 1 ? "w-1/4" : "w-full sm:w-auto"
                }`}
              >
                <ProductCard
                  key={product.id}
                  product={product}
                  value={product.rating}
                  cartValue={fetchedCart}
                />
              </div>
            );
          })
        ) : (
          <p>Aucun produit dans cette catégorie !</p>
        )}
      </GridView>
    </div>
  );
};

export default Hommes;
