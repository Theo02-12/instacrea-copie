"use client";

import React from "react";
import ProductForm from "@components/ProductForm";
import { NewProductInfo } from "../../../../../types/index";
import { newProductInfoSchema } from "@/app/tools/validationSchema";
import { ValidationError } from "yup";
import { toast } from "react-toastify";
import { uploadImage } from "@/app/tools/helper";
import { createProduct } from "../action";

const FormulaireProduit = () => {
  const handleCreateProduct = async (values: NewProductInfo) => {
    try {
      const { thumbnail, images } = values;
      await newProductInfoSchema.validate(values, { abortEarly: false });
      const thumbnailRes = await uploadImage(thumbnail!);

      let productImages: { url: string; id: string }[] = [];
      if (images) {
        const uploadPromise = images.map(async (imageFile) => {
          const { id, url } = await uploadImage(imageFile);
          return { id, url };
        });

        productImages = await Promise.all(uploadPromise);
      }

      await createProduct({
        ...values,
        price: {
          base: values.mrp,
          discounted: values.salePrice,
        },
        thumbnail: thumbnailRes,
        images: productImages,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        error.inner.map((err) => {
          toast.error(err.message);
        });
      }
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold my-4">Ajouter un produit</h1>
      <ProductForm onSubmit={handleCreateProduct} />
    </div>
  );
};

export default FormulaireProduit;
