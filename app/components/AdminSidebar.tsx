"use client";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import {
  LayoutDashboard,
  Euro,
  ShoppingBag,
  Sparkles,
  ShoppingCart,
  User2,
  LogOut,
  PanelRight,
} from "lucide-react";
import SignOutButton from "./SignOutButton";

interface Props {
  children: ReactNode;
}

const AdminSidebar = ({ children }: Props) => {
  const [close, setClose] = useState(false);
  return (
    <div className="flex">
      <div
        className={`transition-all ease-linear duration-300 flex flex-col justify-between bg-black h-screen sticky top-0 w-64 p-10 ${
          close ? "hidden overflow-hidden !p-0" : ""
        }`}
      >
        <ul className="space-y-4 text-[#c1c1c1]">
          <li>
            <Link
              className="flex text-center items-center justify-center font-semibold text-xl text-[#c1c1c1]"
              href="/dashboard"
            >
              Instacréa
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center space-x-1 pt-8"
              href="/dashboard"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Tableau de bord</span>
            </Link>
            <hr className="w-full " />
          </li>
          <li>
            <Link className="flex items-center space-x-1" href="/utilisateurs">
              <User2 className="w-4 h-4" />
              <span>Utilisateurs</span>
            </Link>
            <hr className="w-full " />
          </li>
          <li>
            <Link
              className="flex items-center space-x-1"
              href="/products/produits"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Produits</span>
            </Link>
            <hr className="w-full " />
          </li>
          <li>
            <Link
              className="flex items-center space-x-1"
              href="/products/featured/add"
            >
              <Sparkles className="w-4 h-4" />
              <span>Vedettes</span>
            </Link>
            <hr className="w-full " />
          </li>
          <li>
            <Link className="flex items-center space-x-1" href="/ventes">
              <Euro className="w-4 h-4" />
              <span>Ventes</span>
            </Link>
            <hr className="w-full " />
          </li>
          <li>
            <Link className="flex items-center space-x-1" href="/commandes">
              <ShoppingBag className="h-4 w-4" />
              <span>Commandes</span>
            </Link>
            <hr className="w-full " />
          </li>
        </ul>

        <SignOutButton>
          <div className="flex my-5 cursor-pointer text-white">
            <LogOut /> Me déconnecter
          </div>
        </SignOutButton>
      </div>
      <div className="max-w-screen-xl mx-auto flex-1 p-4 pt-8 overflow-y-auto relative">
        <button
          className={`text-3xl text-black absolute top-[10px] left-[10px] !m-0`}
          onClick={() => (close ? setClose(false) : setClose(true))}
        >
          <PanelRight size={"30px"} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default AdminSidebar;
