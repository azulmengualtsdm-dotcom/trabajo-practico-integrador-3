import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    description: {
      type: String,
      required: false,
      maxlength: 200,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

CategorySchema.virtual("events", {
  ref: "Event",
  localField: "_id",
  foreignField: "categories",
});

export const CategoryModel = model("Category", CategorySchema);
