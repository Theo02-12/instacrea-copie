import { Model, models, model, Document, Schema } from 'mongoose';
import categories from '@tools/categories';
import collection from '../tools/collection';

export interface Product {
  title: string;
  description: string;
  bulletPoints?: string[];
  thumbnail: { url: string; id: string };
  images?: { url: string; id: string }[];
  price: {
    base: number;
    discounted: number;
  };
  collections: string;
  category: string;
  quantity: number;
  rating?: number;
}

export interface ProductDocument extends Product {
  // virtual property
  sale: number;
}

const ProductSchema = new Schema<ProductDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    bulletPoints: { type: [String] },
    thumbnail: {
      type: {
        url: { type: String, required: true },
        id: { type: String, required: true },
      },
      required: true,
    },
    images: [
      {
        url: { type: String, required: true },
        id: { type: String, required: true },
      },
    ],
    price: {
      base: { type: Number, required: true },
      discounted: { type: Number, required: true },
    },
    collections: { type: String, enum: [...collection], required: true },
    category: { type: String, enum: [...categories], required: true },
    quantity: { type: Number, required: true },
    rating: { type: Number },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Define the virtual property outside the schema
ProductSchema.virtual('sale').get(function (this: ProductDocument) {
  return Math.round(((this.price.base - this.price.discounted) / this.price.base) * 100);
});

const ProductModel = models.Product || model<ProductDocument>('Product', ProductSchema);

export default ProductModel as Model<ProductDocument>;
