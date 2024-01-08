import React from "react";
import connectMongoDB from "@lib/mongodb";
import ProductModel from "@/app/models/products";
import ProductCard from "@components/productCard/ProductCard";
import { fetchCartProducts } from "@/app/(shop)/(routes)/cart/page";
import CategorySlider from "../CategorySlider";
import categories from "@/app/tools/categories";

export interface lastestProducts {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  price: {
    base: number;
    discounted: number;
  };
  rating?: number;
  sale: number;
}

export const fetchLatestProducts = async () => {
  await connectMongoDB();
  const products = await ProductModel.find().sort("-createdAt").limit(20);

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

export const ProductCardRated = async () => {
  const fetchedCart = await fetchCartProducts();
  const lastestProducts = await fetchLatestProducts();
  const parsedProduct = JSON.parse(lastestProducts) as lastestProducts[];

  return (
    <div>
      <div>
        {categories.map((category) => {
          const filteredProducts = parsedProduct.filter(
            (product) => category === product.category
          );
          const refilter = filteredProducts.filter((product) => product);

          if (refilter.length > 0) {
            return (
              <div key={category} className={`${refilter.length > 1 ? 'cursor-grab' : ''}`}>
                <p className="uppercase px-4 text-center md:text-start">{category}</p>
                <CategorySlider key={category} showArrow={false}>
                  {refilter.map((product) => (
                    <div key={product.id} className="ms-3 w-[80vw] sm:w-[40vw] md:w-[20vw] m-1 md:m-3 ">

                    <ProductCard
                      key={product.id}
                      product={product}
                      value={product.rating}
                      cartValue={fetchedCart}
                      />
                      </div>
                  ))}
                </CategorySlider>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
