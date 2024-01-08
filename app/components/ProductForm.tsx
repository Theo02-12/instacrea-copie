"use client";

import React, {
  useEffect,
  useState,
  useTransition,
  ChangeEventHandler,
} from "react";
import { PlusIcon, TrashIcon } from "lucide-react";
import categories from "@/app/tools/categories";
import ImageSelector from "@components/ImageSelector";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { NewProductInfo } from "../types/index";
import collection from "../tools/collection";

interface Props {
  initialValue?: InitialValue;
  onSubmit(values: NewProductInfo): void;
  onImageRemove?(source: string): void;
}

export interface InitialValue {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  images?: string[];
  bulletPoints: string[];
  mrp: number;
  salePrice: number;
  category: string;
  collections: string;
  quantity: number;
}

const defaultValue = {
  title: "",
  description: "",
  bulletPoints: [""],
  mrp: 0,
  salePrice: 0,
  category: "",
  collections: "",
  quantity: 0,
};

export default function ProductForm(props: Props) {
  const { onSubmit, onImageRemove, initialValue } = props;
  const [isPending, startTransition] = useTransition();
  const [imagesFiles, setImagesFiles] = useState<File[]>([]);
  const [thumbnail, setThumbnail] = useState<File>();
  const [isForUpdate, setIsForUpdate] = useState(false);
  const [productInfo, setProductInfo] = useState({ ...defaultValue });
  const [thumbnailSource, setThumbnailSource] = useState<string[]>();
  const [productImagesSource, setProductImagesSource] = useState<string[]>();

  const fields = productInfo.bulletPoints;

  const addMoreBulletPoints = () => {
    setProductInfo({
      ...productInfo,
      bulletPoints: [...productInfo.bulletPoints, ""],
    });
  };

  const removeBulletPoint = (indexToRemove: number) => {
    const points = [...productInfo.bulletPoints];
    const filteredPoints = points.filter((_, index) => index !== indexToRemove);
    setProductInfo({
      ...productInfo,
      bulletPoints: [...filteredPoints],
    });
  };

  const updateBulletPointValue = (value: string, index: number) => {
    const oldValues = [...fields];
    oldValues[index] = value;

    setProductInfo({ ...productInfo, bulletPoints: [...oldValues] });
  };

  const removeImage = async (index: number) => {
    if (!productImagesSource) return;

    const imageToRemove = productImagesSource[index];
    const cloudSource = "https://res.cloudinary.com";

    if (imageToRemove.startsWith(cloudSource)) {
      onImageRemove && onImageRemove(imageToRemove);
    } else {
      const fileIndexDiff = productImagesSource.length - imagesFiles.length;
      const indexToRemove = index - fileIndexDiff;
      const newImageFiles = imagesFiles.filter((_, i) => {
        if (i !== indexToRemove) return true;
      });
      setImagesFiles([...newImageFiles]);
    }

    const newImageSource = productImagesSource.filter((_, i) => {
      if (i !== index) return true;
    });
    setProductImagesSource([...newImageSource]);
  };

  const getBtnTitle = () => {
    if (isForUpdate) return isPending ? "Modification..." : "Modifier";
    return isPending ? "Création..." : "Créer";
  };

  useEffect(() => {
    if (initialValue) {
      setProductInfo({ ...initialValue });
      setThumbnailSource([initialValue.thumbnail]);
      setProductImagesSource(initialValue.images);
      setIsForUpdate(true);
    }
  }, [initialValue]);

  const onImagesChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const files = target.files;
    if (files) {
      const newImages = Array.from(files).map((item) => item);
      const oldImages = productImagesSource || [];
      setImagesFiles([...imagesFiles, ...newImages]);
      setProductImagesSource([
        ...oldImages,
        ...newImages.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const onThumbnailChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const files = target.files;
    if (files) {
      const file = files[0];
      setThumbnail(file);
      setThumbnailSource([URL.createObjectURL(file)]);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="mb-2 text-xl">Ajouter un nouveau produit</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(async () => {
            await onSubmit({ ...productInfo, images: imagesFiles, thumbnail });
          });
        }}
        className="space-y-6"
      >
        <div className="space-y-4">
          <h3>Poster</h3>
          <ImageSelector
            id="thumb"
            images={thumbnailSource}
            onChange={onThumbnailChange}
          />

          <h3>Images</h3>
          <ImageSelector
            multiple
            id="images"
            images={productImagesSource}
            onRemove={removeImage}
            onChange={onImagesChange}
          />
        </div>

        <Input
          placeholder="Titre"
          value={productInfo.title}
          onChange={({ target }) =>
            setProductInfo({ ...productInfo, title: target.value })
          }
        />

        <Textarea
          className="h-52"
          placeholder="Description"
          value={productInfo.description}
          onChange={({ target }) =>
            setProductInfo({ ...productInfo, description: target.value })
          }
        />

        <select
          onChange={(event) => {
            const selectedCategory = event.target.value;
            setProductInfo({ ...productInfo, category: selectedCategory });
          }}
          value={productInfo.category}
          placeholder="Selectionner Catégorie"
        >
          <option value={""}>Catégorie...</option>
          {categories.map((c) => (
            <option value={c} key={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          onChange={(event) => {
            const selectedCollection = event.target.value;
            setProductInfo({ ...productInfo, collections: selectedCollection });
          }}
          value={productInfo.collections}
          placeholder="Selectionner Collection"
        >
          <option value={""}>Collection...</option>
          {collection.map((c) => (
            <option value={c} key={c}>
              {c}
            </option>
          ))}
        </select>

        <div className="flex space-x-4">
          <div className="space-y-4 flex-1">
            <h3>Price</h3>
            <label>
              MRP
              <Input
                value={productInfo.mrp}
                placeholder="MRP"
                onChange={({ target }) => {
                  const mrp = +target.value;
                  setProductInfo({ ...productInfo, mrp });
                }}
                className="mb-4"
              />
            </label>
            <label>
              PRIX DE VENTE
              <Input
                value={productInfo.salePrice}
                placeholder="Sale Price"
                onChange={({ target }) => {
                  const salePrice = +target.value;
                  setProductInfo({ ...productInfo, salePrice });
                }}
                className="mb-4"
              />
            </label>
          </div>

          <div className="space-y-4 flex-1">
            <h3>Stock</h3>
            <label>
              Quantité
              <Input
                value={productInfo.quantity}
                placeholder="Qty"
                onChange={({ target }) => {
                  const quantity = +target.value;
                  if (!isNaN(quantity))
                    setProductInfo({ ...productInfo, quantity });
                }}
                className="mb-4"
              />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <h3>Points clés</h3>
          {fields.map((field, index) => (
            <div key={index} className="flex items-center">
              <Input
                type="text"
                value={field}
                placeholder={`Bullet point ${index + 1}`}
                onChange={({ target }) =>
                  updateBulletPointValue(target.value, index)
                }
                className="mb-4"
              />
              {fields.length > 1 ? (
                <button
                  onClick={() => removeBulletPoint(index)}
                  type="button"
                  className="ml-2"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              ) : null}
            </div>
          ))}

          <button
            disabled={isPending}
            type="button"
            onClick={addMoreBulletPoints}
            className="flex items-center space-x-1 text-gray-800 ml-auto"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Ajouter</span>
          </button>
        </div>

        <Button disabled={isPending} type="submit">
          {getBtnTitle()}
        </Button>
      </form>
    </div>
  );
}
