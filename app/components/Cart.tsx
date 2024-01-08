"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Button } from "./ui/button";
import { HomeIcon, Lock } from "lucide-react";
import Image from "next/image";

import secure from "../../public/cartslidesecureicons.png";
import Colissimo from "../../public/colissimo.webp";
import Link from "next/link";
import { ReactNode } from "react";

export interface productProps {
    id: string,
    thumbnail: string,       
    title: string,
    price: number,
    qty: number,
    totalPrice: number
}
interface Props {
  children?: ReactNode;
  product: productProps[] | null;
  totalPrice: number | null,

}

const Cart = ({ children, product, totalPrice }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="bg-white overflow-y-scroll">
        <SheetHeader>
          <SheetTitle className="border-b border-[#030115] text-[#1F2D5C] text-center pb-15">
            Produit ajouté au panier !
          </SheetTitle>
          <div className="text-center">
            {Array.isArray(product) ? product.map((i) => {
              return <div key={i.id} className="border border-[#8DA4EF] m-3 my-5 rounded-xl p-2">
              <Image
                src={i.thumbnail}
                alt={i.title}
                width={626}
                height={451}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
              <div className="pt-8 px-8 pb-10 flex flex-col">
                <div className="flex justify-between border-b border-[#8DA4EF] py-2 my-2">
                  <p className="font-bold">{i.title}</p>
                  <p className="font-bold">x{i.qty}</p>
                </div>
                <div className="flex justify-between text-[#1F2D5C] font-semibold">
                  <p>Sous-total</p>
                  <p>{i.price}€</p>
                </div>
              </div>
            </div>
            }) : ''}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="font-bold flex my-6 border-y w-full justify-between">
              <p>PRIX TOTAL:</p>
              <p>{totalPrice}€</p>
              </div>
              <Button className="bg-[#030115] text-[#c1c1c1] font-normal mb-4 hover:bg-[#030115] hover:text-[#c1c1c1] rounded-full px-6 py-2">
                <div className="flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  <Link href="/cart">Finaliser ma commande</Link>
                </div>
              </Button>
              <SheetClose asChild>
                <Button className="bg-[#3358D4] text-[#c1c1c1] font-normal mb-4 hover:bg-[#030115] hover:text-[#c1c1c1] rounded-full px-6 py-2">
                  <div className="flex items-center">
                    <HomeIcon className="h-4 w-4 mr-2" />
                    <p>Continuer mes achats</p>
                  </div>
                </Button>
              </SheetClose>
              <Image className="mx-auto" src={secure} alt="secure" />
              <div className="text-green-500 mt-4 py-1">
                30 jours satisfaits ou remboursés
              </div>
              <div className="text-[#030115] py-2 px-2">
                Livraison GRATUITE assurée par :
              </div>
              <Image className="py-2 mx-auto" src={Colissimo} alt="colissimo" />
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
