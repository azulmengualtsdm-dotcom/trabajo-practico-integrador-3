import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    minlength: 2,
    maxlength: 30,
  },
  description: {
    type: String,
    required: false,
    maxlength: 200,
  },
  event_id: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
});

export const CategoryModel = model("Category", CategorySchema);
