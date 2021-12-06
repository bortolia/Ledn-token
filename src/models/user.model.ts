import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  dob: Date;
  mfa: string;
  createdAt: Date;
  updatedAt: Date;
  referredBy: string;
}

const userSchema: mongoose.Schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    mfa: { type: String, enum: [null, "TOTP", "SMS"], default: null },
    referredBy: { type: String, required: false, default: null },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });
userSchema.set("versionKey", false);

const UserModel = mongoose.model<IUser>("user", userSchema);

export default UserModel;
