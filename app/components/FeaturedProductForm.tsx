"use client";

import { Button, Input } from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {
  ChangeEventHandler,
  useEffect,
  useState,
  useTransition,
} from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { uploadImage } from "../tools/helper";
import {
  createFeaturedProduct,
  updateFeaturedProduct,
} from "../(admin)/(dashboard)/(routes)/products/featured/actions";
import { FeaturedProductForUpdate } from "../types";

export interface FeaturedProduct {
  file?: File;
  title: string;
  link: string;
  linkTitle: string;
}

interface Props {
  initialValue?: any;
}

const commonValidationFeaturedProduct = {
  title: Yup.string().required("Title is required"),
  link: Yup.string().required("Link is required"),
  linkTitle: Yup.string().required("Link title is required"),
};

const newFeaturedProductValidationSchema = Yup.object().shape({
  file: Yup.mixed<File>()
    .required("File is required")
    .test(
      "fileType",
      "Invalid file format. Only image files are allowed.",
      (value) => {
        if (value) {
          const supportedFormats = ["image/jpeg", "image/png", "image/gif"];
          return supportedFormats.includes((value as File).type);
        }
        return true;
      }
    ),
  ...commonValidationFeaturedProduct,
});

const oldFeaturedProductValidationSchema = Yup.object().shape({
  file: Yup.mixed<File>().test(
    "fileType",
    "Invalid file format. Only image files are allowed.",
    (value) => {
      if (value) {
        const supportedFormats = ["image/jpeg", "image/png", "image/gif"];
        return supportedFormats.includes((value as File).type);
      }
      return true;
    }
  ),
  ...commonValidationFeaturedProduct,
});

const defaultProduct = {
  title: "",
  link: "",
  linkTitle: "",
};

export default function FeaturedProductForm({ initialValue }: Props) {
  const router = useRouter();
  const [isForUpdate, setIsForUpdate] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [featuredProduct, setFeaturedProduct] =
    useState<FeaturedProduct>(defaultProduct);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value, files } = target;

    if (name === "file" && files) {
      const file = files[0];
      if (file) setFeaturedProduct({ ...featuredProduct, file });
    } else setFeaturedProduct({ ...featuredProduct, [name]: value });
  };

  const handleCreate = async () => {
    try {
      const { file, title, linkTitle, link } =
        await newFeaturedProductValidationSchema.validate(
          { ...featuredProduct },
          { abortEarly: false }
        );

      const banner = await uploadImage(file);
      await createFeaturedProduct({ banner, title, linkTitle, link });
      router.refresh()
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.map((err) => {
          toast.error(err.message);
        });
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const { file, title, linkTitle, link } =
        await oldFeaturedProductValidationSchema.validate(
          { ...featuredProduct },
          { abortEarly: false }
        );
      const data: FeaturedProductForUpdate = { title, linkTitle, link };

      if (file) {
        const banner = await uploadImage(file);
        data.banner = banner;
      }

      await updateFeaturedProduct(initialValue.id, data);
      router.push("/products/featured/add");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.map((err) => {
          toast.error(err.message);
        });
      }
    }
  };

  const handleSubmit = async () => {
    if (isForUpdate) await handleUpdate();
    else await handleCreate();
  };

  useEffect(() => {
    if (initialValue) {
      setFeaturedProduct({ ...initialValue });
      setIsForUpdate(true);
    }
  }, [initialValue]);

  const poster = featuredProduct.file
    ? URL.createObjectURL(featuredProduct.file)
    : initialValue?.banner || "";

  const { link, linkTitle, title } = featuredProduct;

  return (
    <form
      action={() => startTransition(async () => await handleSubmit())}
      className="py-4 space-y-4"
    >
      <label htmlFor="banner-file">
        <input
          type="file"
          accept="image/*"
          id="banner-file"
          name="file"
          onChange={handleChange}
          hidden
        />
        <div className="h-[380px] w-full flex flex-col items-center justify-center border border-dashed border-blue-gray-400 rounded cursor-pointer relative">
          {poster ? (
            <Image alt="banner" src={poster || initialValue?.banner} fill />
          ) : (
            <>
              <span>Select Banner</span>
              <span>1140 x 380</span>
            </>
          )}
        </div>
      </label>
      <Input
        label="Title"
        name="title"
        value={title}
        onChange={handleChange}
        crossOrigin={undefined}
        className="rounded"
      />
      <div className="flex space-x-4">
        <Input
          label="Link"
          name="link"
          value={link}
          onChange={handleChange}
          crossOrigin={undefined}
          className="border-0 mt-3 rounded"
        />
        <Input
          label="Link Title"
          name="linkTitle"
          value={linkTitle}
          onChange={handleChange}
          crossOrigin={undefined}
          className="mt-3 rounded"
        />
      </div>
      <div className="text-right ">
        <Button className="text-black bg-gray-200 rounded my-3" type="submit">
          {isForUpdate ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
