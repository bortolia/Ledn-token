import { Request, Response } from "express";
import TransactionModel from "../models/transaction.model";
import UserModel, { IUser } from "../models/user.model";

export const getUserHandler = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const user: IUser | null = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: `User ${email} does not exist.` });
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ msg: error.message });
    } else {
      res.status(500).send({ msg: error });
    }
  }
};

export const createUserHandler = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const userExists: boolean = await UserModel.exists({ email });
    if (userExists) {
      return res.status(409).json({ msg: `User ${email} already exists.` });
    } else {
      const newUserDocument: IUser = req.body;
      const newUser = await UserModel.create(newUserDocument);
      return res.status(201).json(newUser);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ msg: error.message });
    } else {
      res.status(500).send({ msg: error });
    }
  }
};

export const updateUserHandler = async (req: Request, res: Response) => {
  const reqEmail = req.params.email;
  try {
    const user = await UserModel.findOne({ email: reqEmail });
    if (!user) {
      return res.status(404).json({ msg: `User with email: ${reqEmail} does not exist.` });
    } else {
      const { firstName, lastName, country, email, dob, mfa, referredBy } = req.body;

      user.firstName = firstName;
      user.lastName = lastName;
      user.country = country;
      user.email = email;
      user.dob = dob;
      user.mfa = mfa;
      user.referredBy = referredBy;

      const updatedUser = await UserModel.findOneAndUpdate({ email: reqEmail }, user, {
        new: true,
      });
      if (reqEmail !== email) {
        const _updateTransactions = await TransactionModel.updateMany(
          { userEmail: reqEmail },
          { userEmail: email }
        );
      }
      return res.status(200).json(updatedUser);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ msg: error.message });
    } else {
      res.status(500).send({ msg: error });
    }
  }
};
