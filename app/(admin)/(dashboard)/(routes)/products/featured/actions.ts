"use server";
import connectMongoDB from "@/app/lib/mongodb";
import featuredProductModel from "@/app/models/featuredProducts";
import { FeaturedProductForUpdate, NewFeaturedProduct } from "@/app/types";
import { removeImageFromCloud } from "../action";

export const createFeaturedProduct = async (info: NewFeaturedProduct) => {
  try {
    await connectMongoDB();
    await featuredProductModel.create({ ...info });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const updateFeaturedProduct = async (
  id: string,
  info: FeaturedProductForUpdate
) => {
  try {
    await connectMongoDB();
    await featuredProductModel.findByIdAndUpdate(id, { ...info });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const deleteFeaturedProduct = async (
  id: string,
) => {
  try {
    await connectMongoDB();
    const product = await featuredProductModel.findByIdAndDelete(id);
    if(product){
        await removeImageFromCloud(product.banner.id)
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
