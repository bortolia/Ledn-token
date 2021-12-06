import { Request, Response } from "express";
import UserModel, { IUser } from "../models/user.model";
import TransactionModel, { ITransaction } from "../models/transaction.model";

export const getTransactionsHandler = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { type } = req.query;
  const filterObject: any = {};

  try {
    filterObject.userEmail = email;
    if (typeof type === "string" && (type === "send" || type === "receive")) {
      filterObject.type = type;
    }

    const transactions = await TransactionModel.find(filterObject);
    return res.status(200).json(transactions);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ msg: error.message });
    } else {
      res.status(500).send({ msg: error });
    }
  }
};

export const getCurrentBalanceHandler = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    let balance: number = 0;
    const userExists: boolean = await UserModel.exists({ email });
    if (userExists) {
      const aggregateBal = await TransactionModel.aggregate([
        { $match: { userEmail: email } },
        { $group: { _id: "$type", totalAmount: { $sum: "$amount" } } },
      ]);

      aggregateBal.forEach((aggregate) => {
        if (aggregate._id === "send") {
          balance -= aggregate.totalAmount;
        } else {
          balance += aggregate.totalAmount;
        }
      });
      res.status(200).json({ balance });
    } else {
      return res.status(404).json({ msg: `User ${email} does not exist.` });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ msg: error.message });
    } else {
      res.status(500).send({ msg: error });
    }
  }
};

export const createDebitHandler = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { amount } = req.body;
  try {
    const userExists: boolean = await UserModel.exists({ email });
    if (userExists) {
      const newDebitDocument: ITransaction = new TransactionModel({
        userEmail: email,
        amount,
        type: "send",
      });

      const newDebit = await TransactionModel.create(newDebitDocument);

      res.status(201).json(newDebit);
    } else {
      return res.status(404).json({ msg: `User ${email} does not exist.` });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ msg: error.message });
    } else {
      res.status(500).send({ msg: error });
    }
  }
};

export const createCreditHandler = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { amount } = req.body;
  try {
    const userExists: boolean = await UserModel.exists({ email });
    if (userExists) {
      const newCreditDocument: ITransaction = new TransactionModel({
        userEmail: email,
        amount,
        type: "receive",
      });

      const newCredit = await TransactionModel.create(newCreditDocument);
      res.status(201).json(newCredit);
    } else {
      return res.status(404).json({ msg: `User ${email} does not exist.` });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ msg: error.message });
    } else {
      res.status(500).send({ msg: error });
    }
  }
};

export const createTransferHandler = async (req: Request, res: Response) => {
  const { fromEmail, toEmail, amount } = req.body;
  try {
    const fromUser = await UserModel.findOne({ email: fromEmail });
    if (!fromUser) {
      return res.status(404).json({ msg: `User ${fromEmail} does not exist` });
    }
    const toUser = await UserModel.findOne({ email: toEmail });
    if (!toUser) {
      return res.status(404).json({ msg: `User ${toEmail} does not exist` });
    }
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ msg: `${amount} is an invalid amount` });
    }

    const sendTransaction = new TransactionModel({
      userEmail: fromEmail,
      amount: amount,
      type: "send",
    });
    const receiveTransaction = new TransactionModel({
      userEmail: toEmail,
      amount: amount,
      type: "receive",
    });
    const newTransactions = await TransactionModel.insertMany([
      sendTransaction,
      receiveTransaction,
    ]);

    res.status(201).json(newTransactions);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ msg: error.message });
    } else {
      res.status(500).send({ msg: error });
    }
  }
};
