import React from "react";
import BuyingOptions from "@components/BuyingOptions";
import ProductImageGallery from "@components/ProductImageGallery";

interface Props {
  title: string;
  description: string;
  images: string[];
  points?: string[];
  price: { base: number; discounted: number };
  sale: number;
  wishlist?: boolean
  outOfStock?: boolean;
}

export default function ProductView({
  description,
  images,
  title,
  points,
  price,
  sale,
  wishlist,
  outOfStock,
}: Props) {
  return (
    <div className="flex lg:flex-row flex-col md:gap-4 gap-2 capitalize">
      <div className="flex-1 lg:self-start self-center">
        {/* Product Image Slider */}
        <ProductImageGallery images={images} />
      </div>

      <div className="flex-1 md:space-y-4 space-y-2 bg-gray-100/50 p-4 rounded-2xl">
        <h1 className="md:text-3xl text-xl font-semibold mb-2">{title}</h1>
        <div className="flex items-center space-x-2 mb-2">
          <p className="line-through text-xl">{price.base}€</p>
          <p className="font-semibold text-xl">{price.discounted}€</p>
          <p className="font-bold uppercase whitespace-nowrap select-none bg-red-500 text-white py-1.5 px-3 text-xs rounded-lg">
            {`${sale}% off`}
          </p>
        </div>
        <p>{description}</p>

        <div className="flex flex-col py-4">
          {outOfStock ? (
            <div className="uppercase text-red-500 font-semibold">rupture de stock</div>
          ) : (
          <BuyingOptions wishlist={wishlist}/>
          )}
        </div>
      </div>
    </div>
  );
}
