import mongoose, { Document, Model, model, Schema } from "mongoose";
import { IUser } from '../types/user.types'
import bcrypt from 'bcryptjs'


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
      default:'none'
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next: mongoose.HookNextFunction) {
  const user = this as IUser
  if (!user.isModified('password')) {
      return next()
  }
  const hashPassword = bcrypt.hashSync(user.password, 5)

  user.password = hashPassword

  return next()
})

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  const user = this as IUser
  //console.log(user)
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false)

}
const User: Model<IUser> = model("User", userSchema);

export default User;
