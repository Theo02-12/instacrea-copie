"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useTransition } from "react";
import Wishlist from "./Wishlist";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
  products: {
    id: string;
    title: string;
    thumbnail: string;
    price: number;
  };
}
export const WishListItem = ({ products }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { id, title, thumbnail, price } = products;

  const updateWishlist = async () => {
    if (!id) return;

    const res = await fetch("/api/product/wishlist", {
      method: "POST",
      body: JSON.stringify({ productId: id }),
    });

    const { error } = await res.json();
    if (!res.ok && error) toast.error(error);
    router.refresh();
  };

  return (
    <div className="flex space-x-4 items-center">
      <Link className="flex w-full" href={`/${title}/${id}`}>
        <Image
          src={thumbnail}
          width={100}
          height={100}
          alt={title}
          className="border me-3"
        />
        <div>
          <p className="font-semibold">{title}</p>
          <p>{price}€</p>
        </div>
      </Link>
      <Button
        variant="text"
        className="mx-5 rounded-2xl px-4"
        onClick={() => {
          startTransition(async () => await updateWishlist());
        }}
        disabled={isPending}
      >
        <Wishlist isActive />
      </Button>
    </div>
  );
};
