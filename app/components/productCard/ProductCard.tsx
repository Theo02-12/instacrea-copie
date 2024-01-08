"use client";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
  Chip,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "react-toastify";
import truncate from "truncate";
import useAuth from "../../hooks/useAuth";
import { redirect, useRouter } from "next/navigation";
import RatingStars from "../RatingStars";
import Cart, { productProps } from "../Cart";
import React from "react";
import useDrag from "@/app/hooks/useDrag";
export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  sale: number;
  price: {
    base: number;
    discounted: number;
  };
  rating?: number;
}
interface Props {
  product: Product;
  value?: number;
  cartValue: {
    totalPrice: number;
    products: productProps[] 
  }
}

export default function ProductCard({ product, value, cartValue }: Props) {
  const { loggedIn } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  // const fetchedCart = await fetchCartProducts()

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout/instant", {
      method: "POST",
      body: JSON.stringify({ productId: product.id }),
    });

    const { error, url } = await res.json();

    if (error) {
      toast.error(error);
    } else {
      window.location.href = url;
    }
  };

  const addToCart = async () => {
    if (!loggedIn) return router.push("/auth/signin");

    const res = await fetch("/api/product/cart", {
      method: "POST",
      body: JSON.stringify({ productId: product.id, quantity: 1 }),
    });

    const { error } = await res.json();
    if (!res.ok && error) toast.error(error);

    router.refresh();
  };

  return (
    <Card className="w-full rounded-large shadow-lg cursor-pointer" style={{ userSelect: 'none' }} >
      <div className="w-full" style={{ userSelect: 'none'}}>
        <CardHeader
          shadow={false}
          floated={false}
          className="relative w-full aspect-square m-0"
          onClick={() => router.push(`/${product.title}/${product.id}`)}
        >
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            loading="eager"
            className="rounded-t-large"
            sizes="(max-width: 640px) 100vw,max-width: 1200px) 50vw, 33vw"
            style={{pointerEvents: 'none', objectFit: 'cover'}}
          />
          <div className="absolute right-0 p-2">
            <Chip color="red" value={`${product.sale}% off`} />
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-2">
            <h2 className="line-clamp-1 font-medium text-blue-gray-800 capitalize">
              {truncate(product.title, 50)}
            </h2>
          </div>
          <RatingStars value={value!} />
          <div className="flex justify-end items-center space-x-2 mb-2">
            <Typography color="blue-gray" className="font-medium line-through">
              {product.price.base}€
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              {product.price.discounted}€
            </Typography>
          </div>
          <p className="font-normal text-sm opacity-75 line-clamp-3">
            {product.description}
          </p>
        </CardBody>
      </div>
      <CardFooter className="pt-0 space-y-4">
        <Cart product={cartValue?.products ? cartValue.products : null} totalPrice={cartValue?.totalPrice ? cartValue.totalPrice : null}>
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-900/10 rounded-2xl text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
            onClick={() => {
              startTransition(async () => await addToCart());
            }}
            disabled={isPending}
          >
            Ajouter au panier
          </Button>
        </Cart>
      </CardFooter>
    </Card>
  );
}
