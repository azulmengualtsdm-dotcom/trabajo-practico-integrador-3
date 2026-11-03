import { Schema, model } from "mongoose";

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 150,
    },
    description: {
      type: String,
      minlength: 20,
      required: true,
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
      min: 1,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
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
        required: true,
      },
      address: {
        type: String,
        minlength: 5,
        maxlength: 150,
        required: true,
      },
      city: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true,
      },
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const EventModel = model("Event", EventSchema);
