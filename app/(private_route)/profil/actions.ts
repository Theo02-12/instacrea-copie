"use server";
import connectMongoDB from "@lib/mongodb";
import UserModel from "@models/userModel";
import { UserProfileToUpdate } from "../../types/index";
import ReviewModel from "@/app/models/reviewModel";

export const updateUserProfile = async (infos: UserProfileToUpdate) => {
  try {
    await connectMongoDB();
    await UserModel.findByIdAndUpdate(infos.id, {
      lastname: infos.lastname,
      firstname: infos.firstname,
      avatar: infos.avatar,
    });
  } catch (error) {
    console.log("error while updating profile !");
    throw error;
  }
};


export const fetchRating = async () => {
  await connectMongoDB()
  const rating = await ReviewModel.aggregate([
    // {$match: {product: new Types.ObjectId(productId)}},
    {
      $group: {
        _id: "$product",
        rate: { $sum: "$rating"},
        count: {$sum: 1}
      }
    },
    {
      $project: {
        _id: 0,
        id: "$_id",
        rate: 1,
        count: 1
    }
  }
  ])
  if(!rating) return null

  return rating
}
