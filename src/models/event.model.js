import { Schema, model } from "mongoose";

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 150,
  },
  description: {
    type: String,
    minlength: 20,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  capacity: {
    type: Number,
    minlength: 1,
  },
  price: {
    type: Number,
    minlength: 0,
    default: 0,
  },
  status: {
    type: String,
    enum: {
      values: ["scheduled", "cancelled", "finished"],
    },
    default: "scheduled",
  },
  location: {
    venue: {
      type: String,
      minlength: 3,
      maxlength: 100,
    },
    address: {
      type: String,
      minlength: 5,
      maxlength: 150,
    },
    city: {
      type: String,
      minlength: 2,
      maxlength: 50,
    },
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export const EventModel = model("Event", EventSchema);
