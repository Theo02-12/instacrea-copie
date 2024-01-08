import { Document, Model, ObjectId, Schema, model, models } from "mongoose";

interface reviewDocument extends Document {
  userId: ObjectId;
  product: ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
}

const reviewSchema = new Schema<reviewDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
    unique: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  rating: { type: Number, required: true },
  comment: String
}, {timestamps: true});

const ReviewModel = models.Review || model('Review', reviewSchema)

export default ReviewModel as Model<reviewDocument>
