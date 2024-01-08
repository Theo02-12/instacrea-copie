"use client";
import React, { useState, useTransition } from "react";
import { Avatar, Button } from "@material-tailwind/react";
import { Input } from "./ui/input";
import ProfileAvatarInput from "@components/ProfileAvatarInput";
import { toast } from "react-toastify";
import { uploadImage } from "@tools/helper";
import { updateUserProfile } from "../(private_route)/profil/actions";
import { UserProfileToUpdate } from "../types";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Pen } from "lucide-react";

interface Props {
  avatar?: string;
  firstname: string;
  lastname: string;
  email: string;
  id: string;
}

export default function ProfileForm({
  id,
  firstname,
  lastname,
  avatar,
  email,
}: Props) {
  const [avatarFile, setAvatarFile] = useState<File>();
  const [userFirstName, setUserFirstName] = useState(firstname);
  const [userLastName, setUserLastName] = useState(lastname);
  const router = useRouter();

  const avatarSource = avatarFile ? URL.createObjectURL(avatarFile) : avatar;
  const showSubmitButton =
    avatarSource !== avatar ||
    userFirstName !== firstname ||
    userLastName !== lastname;

  const updateUserInfo = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (firstname.trim().length < 2 || lastname.trim().length < 2)
      return toast.error("Name is invalid!");

    const info: UserProfileToUpdate = {
      id,
      firstname: userFirstName,
      lastname: userLastName,
    };

    if (avatarFile) {
      const avatar = await uploadImage(avatarFile);
      info.avatar = avatar;
    }

    await updateUserProfile(info);
    router.refresh();
  };

  return (
    <>
      <Dialog>
        <div className="space-y-6 flex flex-col justify-center shadow-2xl px-5 py-[50px] rounded-2xl relative min-h-[300px] w-[80%] md:w-[30%] z-10">
          <div className="absolute -top-[55px] left-0 flex flex-col items-center w-full ">
            <Avatar
              src={avatarSource}
              className="w-28 h-28 rounded-full  relative  border-black object-cover z-20"
            />
            <div className="w-32 h-16  bg-gray-300 absolute -top-2 rounded-[100px_100px_0_0] "></div>
          </div>
          <DialogTrigger className="border border-black w-1/3 mx-auto rounded flex items-center p-2 ">
          <span className="mr-2">Modifier mon profil</span><Pen size={"20px"} />
          </DialogTrigger>
          <div>
            <label htmlFor="">
              Email
              <Input
                className="text-sm rounded-xl"
                defaultValue={email}
                readOnly
              />
            </label>
          </div>
          <div className="flex ">
            <label htmlFor="firstname" className="w-1/2 me-3">
              Prénom
              <Input
                readOnly
                value={userFirstName}
                id="firstname"
                className="font-semibold rounded-xl"
              />
            </label>
            <label htmlFor="lastname" className="w-1/2">
              Nom
              <Input
                readOnly
                value={userLastName}
                id="lastname"
                className="font-semibold rounded-xl"
              />
            </label>
          </div>
        </div>

        <DialogContent className="bg-white">
          <DialogTitle>Modifier mes informations</DialogTitle>
          <form
            onSubmit={updateUserInfo}
            className="space-y-6 bg-gray-200 p-5 rounded-2xl relative h-[400px]"
          >
            <div className="w-full flex justify-center">
              <ProfileAvatarInput
                onChange={setAvatarFile}
                nameInitial={userFirstName + " " + userLastName}
                avatar={avatarSource}
              />
            </div>
            <label htmlFor="">
              Email
              <Input
                className="text-sm rounded-xl"
                defaultValue={email}
                readOnly
              />
            </label>
            <div className="flex ">
              <label htmlFor="firstname" className="w-1/2 me-3">
                Prénom
                <Input
                  onChange={({ target }) => setUserFirstName(target.value)}
                  value={userFirstName}
                  id="firstname"
                  className="font-semibold rounded-xl"
                />
              </label>
              <label htmlFor="lastname" className="w-1/2">
                Nom
                <Input
                  onChange={({ target }) => setUserLastName(target.value)}
                  value={userLastName}
                  id="lastname"
                  className="font-semibold rounded-xl"
                />
              </label>
            </div>
            <Button
              type="submit"
              className="w-full text-black rounded shadow-none hover:shadow-none hover:scale-[0.98] bg-orange-300"
              disabled={!showSubmitButton}
            >
              Modifier
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
