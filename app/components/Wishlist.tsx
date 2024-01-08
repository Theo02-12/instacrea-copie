import React from "react";
import { FilledHeart, EmptyHeart } from "./HeartIcon";
interface Props {
  isActive?: boolean;
}
const Wishlist = ({ isActive }: Props) => {
  return isActive ? <FilledHeart /> : <EmptyHeart />;
};
export default Wishlist;
