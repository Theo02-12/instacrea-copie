import React, { Suspense } from "react";
import { auth } from "@/auth";
import ProfileForm from "@components/ProfileForm";
import connectMongoDB from "@lib/mongodb";
import { redirect } from "next/navigation";
import UserModel from "@models/userModel";
import Loading from "./loading";

export const fetchUserProfile = async () => {
  const session = await auth();
  if (!session) {
    return {
      id: null,
      firstname: null,
      lastname: null,
      email: null,
      avatar: undefined,
    };
  }

  await connectMongoDB();
  const user = await UserModel.findById(session.user.id);
  if (!user) return redirect("/auth/signin");

  return {
    id: user._id.toString(),
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    avatar: user.avatar?.url,
  };
};

export default async function Profile() {
  const user = await fetchUserProfile();

  return (
    <Suspense fallback={<Loading />}>

    <div className="bg-gray-100 min-h-[60vh] py-36 flex items-center justify-center">
      {user.id ? (
        <ProfileForm
        firstname={user.firstname || "Default Firstname"}
        lastname={user.lastname || "Default Lastname"}
        email={user.email || "Default Email"}
        id={user.id}
        avatar={user.avatar || undefined} 
        />
        ) : (
          redirect("/auth/signin")
          )}
    </div>
          </Suspense>
  );
}
