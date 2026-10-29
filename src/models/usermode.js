import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
      },
      default: "user",
    },
    profile: {
      firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxlength: 50,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxlength: 50,
      },
      birthDate: {
        type: Date,
        required: false,
      },
      phone: {
        type: String,
        required: false,
      },
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UserModel = model("User", UserSchema);
