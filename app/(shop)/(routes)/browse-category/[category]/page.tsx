import connectMongoDB from "@lib/mongodb";
import ProductModel from "@models/products";
import GridView from "@components/GridView";
import ProductCard from "@components/productCard/ProductCard";
import CategorySlider from "@components/CategorySlider";
import { fetchCartProducts } from "../../cart/page";
import categories from "@/app/tools/categories";
import { Badge } from "@components/ui/badge";
import Link from "next/link";

interface lastestProducts {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  price: {
    base: number;
    discounted: number;
  };
  rating: number;
  sale: number;
}

const fetchLatestProducts = async (category: string) => {
  await connectMongoDB();
  const products = await ProductModel.find({ category }).sort("-createdAt");

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
  params: { category: string };
}

export default async function Home({ params }: Props) {
  const decoded = decodeURIComponent(params.category);
  const lastestProducts = await fetchLatestProducts(decoded);
  const parsedProduct = JSON.parse(lastestProducts) as lastestProducts[];
  const fetchedCart = await fetchCartProducts()
  return (
    <div className="py-4 space-y-4 w-[80%] min-h-[50vh] mx-auto">
      <div className="flex flex-col items-center mb-5">
        <h1 className="font-bold relative text-2xl pb-3">
          Nos produits dans la catégorie {decoded} !
        </h1>
        <span className="w-[50px] h-[3px] bg-[#f39f2e] "></span>
      </div>
      <CategorySlider>
          {categories.map((cat, i) => {
            return (
              <Link href={`/browse-category/${cat}`} key={i}>
                <div className="px-5 mx-3 whitespace-nowrap border border-[#744906] text-[#744906] uppercase font-bold rounded">
                  <Badge>{cat}</Badge>
                </div>
              </Link>              
            );
          })}
        </CategorySlider>
      <div>
        {parsedProduct.length === 0
          ? "Aucun produit dans cette catégorie !"
          : ""}
      </div>
      <GridView>
        {parsedProduct.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              value={product.rating} cartValue={fetchedCart}
            />
          );
        })}
      </GridView>
    </div>
  );
}
