"use client";
import { NewProductInfo, ProductResponse, ProductToUpdate } from "../types/index";
import React from "react";
import ProductForm, { InitialValue } from "./ProductForm";
import {
  removeAndUpdateProductImage,
  removeImageFromCloud,
  updateProduct,
} from "../(admin)/(dashboard)/(routes)/products/action";
import { updateProductInfoSchema } from "../tools/validationSchema";
import { toast } from "react-toastify";
import { ValidationError } from "yup";
import { uploadImage } from "../tools/helper";

interface Props {
  product: ProductResponse;
}
export default function UpdateProduct({ product }: Props) {
  const initialValue: InitialValue = {
    ...product,
    thumbnail: product.thumbnail.url,
    images: product.images?.map(({ url }) => url),
    mrp: product.price.base,
    salePrice: product.price.discounted,
    bulletPoints: product.bulletPoints || [],
  };

  const removeAndUpdate = (source: string) => {
    const splittedData = source.split("/");
    const lastItem = splittedData[splittedData.length - 1];
    const publicId = lastItem.split(".")[0];
    console.log(publicId);

    removeAndUpdateProductImage(product.id, publicId);
  };

  const handleUpdate = async (values: NewProductInfo) => {
    try {
      const { thumbnail, images } = values;
      await updateProductInfoSchema.validate(values, { abortEarly: false });

      const dataToUpdate: ProductToUpdate = {
        title: values.title,
        description: values.description,
        bulletPoints: values.bulletPoints,
        category: values.category,
        quantity: values.quantity,
        price: {
          base: values.mrp,
          discounted: values.salePrice,
        },
      };

      if (thumbnail) {
        await removeImageFromCloud(product.thumbnail.id);
        const { id, url } = await uploadImage(thumbnail);
        dataToUpdate.thumbnail = { id, url };
      }

      if (images.length) {
        const uploadPromise = images.map(async (imgFiles) => {
          return await uploadImage(imgFiles);
        });
        dataToUpdate.images = await Promise.all(uploadPromise);
      }

      updateProduct(product.id, dataToUpdate)

    } catch (error: any) {
      if (error instanceof ValidationError) {
        error.inner.map((err) => {
          toast.error(err.message);
        });
      }
    }
  };
    return (
      <ProductForm
        onImageRemove={removeAndUpdate}
        initialValue={initialValue}
        onSubmit={handleUpdate}
      />
    );
}
