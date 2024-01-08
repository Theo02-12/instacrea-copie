import { Document, Model, ObjectId, Schema, model, models } from "mongoose";

interface WishlistDocument extends Document {
  user: ObjectId;
  products: ObjectId[];
}

const WishlistSchema = new Schema<WishlistDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const WishlistModel = models.Wishlist || model("Wishlist", WishlistSchema);
export default WishlistModel as Model<WishlistDocument>;
