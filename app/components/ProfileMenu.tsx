"use client";

import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  PowerIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Link from "next/link";
import useAuth from "@hooks/useAuth";
import { MenuItems } from "@app/types";
import SignOutButton from "./SignOutButton";
import { EmptyHeart } from "./HeartIcon";
import { Heart } from "lucide-react";

interface Props {
  menuItems: MenuItems[];
  src: string;
}

export default function ProfileMenu({ menuItems, src }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const { isAdmin } = useAuth();

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            size="sm"
            alt="candice wu"
            className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
            src={
              src
                ? src
                : "https://res.cloudinary.com/dp2ytiudl/image/upload/v1695902829/sample.jpg"
            }
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>

      <MenuList className="p-1 z-10 rounded">
        {menuItems.map(({ href, icon, label }) => {
          return (
            <Link key={href} href={href} className="outline-none">
              <MenuItem
                onClick={closeMenu}
                className="flex items-center gap-2 rounded"
              >
                {icon}
                <span>{label}</span>
              </MenuItem>
            </Link>
          );
        })}

        {isAdmin ? (
          <Link href="/dashboard" className="outline-none">
            <MenuItem
              onClick={closeMenu}
              className="flex items-center gap-2 rounded"
            >
              <RectangleGroupIcon className="h-4 w-4" />
              <span>Tableau de bord</span>
            </MenuItem>
          </Link>
        ) : null}

        <Link href="/wishlist" className="flex items-center hover:border-none">
          <MenuItem>
            <p className="flex">
              <Heart size={"18px"} className="me-2" />
              Coup de coeur
            </p>
          </MenuItem>
        </Link>
        <MenuItem>
          <SignOutButton>
            <p className="flex items-center gap-2 rounded">
              <PowerIcon className="h-4 w-4" />
              <span>Déconnection</span>
            </p>
          </SignOutButton>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
