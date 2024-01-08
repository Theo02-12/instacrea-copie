"use client";
import Image from "next/image";
import React, { useState } from "react";
import dateFormat from "dateformat";
import { ChevronDown } from "lucide-react";

type product = {
  id: string;
  title: string;
  thumbnail: string;
  totalPrice: number;
  price: number;
  qty: number;
};

export interface Orders {
  id: any;
  products: product[];
  paymentStatus: string;
  date: string;
  total: number;
  deliveryStatus: "ordered" | "delivered" | "shipped";
}

interface visibility {
  [key: string]: boolean;
}

export default function OrderListPublic({ orders }: { orders: Orders[] }) {
  const [isVisible, setIsVisible] = useState<visibility>({});

  const toggleDetail = (orderId: string) => {
    setIsVisible((prevState) => {
      return {
        ...prevState,
        [orderId]: !prevState[orderId],
      };
    });
  };
  return (
    <div>
      {orders.map((order, idx) => {
        idx++;
        return (
          <div key={order.id} className="py-4 space-y-4">
            <div
              className={`relative flex flex-col lg:flex-row rounded-xl lg:justify-between lg:items-center border-b p-2 ${
                idx % 2 === 0 ? "bg-gray-200" : "rounded-none"
              }`}
            >
              <p>
                #{idx} <b className="ms-2">N°{order.id}</b>
              </p>
              <p className="text-red-500 font-semibold">{order.total} € TTC</p>
              <p>{dateFormat(order.date, "dd/mm/yyyy")}</p>
              {/* <Chip value={order.paymentStatus} color="amber" /> */}
              <p className="text-green-500">
                Status:{" "}
                <span className="capitalize">
                  {order.deliveryStatus === "delivered"
                    ? "livrée"
                    : order.deliveryStatus === "ordered"
                    ? "Commandé"
                    : order.deliveryStatus === "shipped"
                    ? "Expédiée"
                    : ""}
                </span>
              </p>

              <button
                className="flex mt-2 md:m-0 md:absolute md:right-3 text-[#3A5BC7] font-semibold lg:static"
                onClick={() => toggleDetail(order.id)}
              >
                Détails{" "}
                <span
                  className={`transition-all ease-in-out duration-200 ${
                    isVisible[order.id] ? "rotate-180 " : ""
                  }`}
                >
                  <ChevronDown />
                </span>
              </button>
            </div>
            <div className={`${isVisible[order.id] ? "block" : "hidden"} p-2`}>
              {order.products.map((p) => {
                return (
                  <div key={p.id} className="border p-2">
                    <div className="flex space-x-2 border-b px-3 mb-3">
                      <Image
                        className="pb-2"
                        src={p.thumbnail}
                        width={80}
                        height={80}
                        alt={p.title}
                      />
                      <div className="flex flex-wrap md:flex-row justify-between  items-center w-full">
                        <p className="font-semibold">{p.title}</p>
                        <p>x{p.qty}</p>
                        <p className="text-red-500 font-semibold">
                          {p.price} €
                        </p>
                      </div>
                    </div>
                    <div className="px-3">
                      <div className="flex justify-between mb-2">
                        <p>Frais de port</p>
                        <p>{p.price >= 30 ? "Offert" : 5 + "€"}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>TOTAL DE LA COMMANDE</p>
                        <p className="text-red-500 font-semibold">{p.price}€</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
