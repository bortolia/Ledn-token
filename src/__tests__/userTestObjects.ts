import mongoose from "mongoose";

const objId = new mongoose.Types.ObjectId().toString();
export const mockedUser = {
  _id: objId,
  firstName: "John",
  lastName: "Smith",
  country: "CA",
  email: "john.smith_123@gmail.com",
  dob: "2000-01-09T00:00:00.000Z",
  mfa: "SMS",
  referredBy: null,
  createdAt: "2021-10-02T05:51:19.199Z",
  updatedAt: "2021-10-02T06:00:14.491Z",
};

export const mockedUserInput = {
  firstName: "John",
  lastName: "Smith",
  country: "CA",
  email: "john.smith_123@gmail.com",
  dob: "2000-01-09T00:00:00.000Z",
  mfa: "SMS",
  referredBy: null,
};

export const mockedUserUpdateInput = {
  firstName: "John",
  lastName: "Smith",
  country: "US",
  email: "john.smith_123@gmail.com",
  dob: "2000-01-09T00:00:00.000Z",
  mfa: "TOTP",
  referredBy: null,
};

export const mockedUserUpdateEmailInput = {
  firstName: "John",
  lastName: "James",
  country: "US",
  email: "john.james_123@gmail.com",
  dob: "2000-01-09T00:00:00.000Z",
  mfa: "TOTP",
  referredBy: null,
};

export const mockedUserUpdated = {
  _id: objId,
  firstName: "John",
  lastName: "Smith",
  country: "US",
  email: "john.smith_123@gmail.com",
  dob: "2000-01-09T00:00:00.000Z",
  mfa: "TOTP",
  referredBy: null,
  createdAt: "2021-10-02T05:51:19.199Z",
  updatedAt: "2021-10-02T06:00:14.491Z",
};
export const userEmail = "john.smith_123@gmail.com";

export const doesNotExistMsg = { msg: "User john.smith_123@gmail.com does not exist." };

export const alreadyExistMsg = { msg: "User john.smith_123@gmail.com already exists." };

export const transTypeTotals = [
  { _id: "receive", totalAmount: 4735182393 },
  { _id: "send", totalAmount: 4138259776 },
];

export const totalBalance = {
  balance: 596922617,
};

export const transactionUpdateAck = {
  acknowledged: true,
  modifiedCount: 3,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 3,
};
