import mongoose, { Document, Model, model, Schema } from "mongoose";
// TODO: Use it as an example
/**
 * Interface to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 * @param avatar:string
 */
export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  avatar: string;
  createdAt: Date
  updatedAt: Date
}

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = model("User", userSchema);

export default User;
