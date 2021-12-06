import mongoose, { Document } from "mongoose";

export interface ITransaction extends Document {
  userEmail: string;
  amount: number;
  type: string;
  createdAt: Date;
}

const transactionSchema: mongoose.Schema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["send", "receive"] },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

transactionSchema.index({ userEmail: 1 });
transactionSchema.set("versionKey", false);

const TransactionModel = mongoose.model<ITransaction>("transaction", transactionSchema);

export default TransactionModel;
