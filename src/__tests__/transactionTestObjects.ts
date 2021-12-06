import mongoose from "mongoose";

const objId = new mongoose.Types.ObjectId().toString();

export const userEmail = "john.smith_123@gmail.com";
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

export const userEmail2 = "jane.jill@hotmail.com";
export const mockedUser2 = {
  _id: objId,
  firstName: "Jane",
  lastName: "Jill",
  country: "CA",
  email: "jane.jill@hotmail.com",
  dob: "2001-01-09T00:00:00.000Z",
  mfa: null,
  referredBy: null,
  createdAt: "2021-01-02T05:51:19.199Z",
  updatedAt: "2021-01-02T06:00:14.491Z",
};

export const transactionsMock = [
  {
    _id: "61a411265527048981255b1c",
    userEmail: "Berta_McGlynn62@yahoo.com",
    amount: 628551685,
    type: "send",
    createdAt: "2020-09-04T04:25:21.018Z",
  },
  {
    _id: "61a411265527048981255b1d",
    userEmail: "Berta_McGlynn62@yahoo.com",
    amount: 109219925,
    type: "receive",
    createdAt: "2019-05-09T14:41:59.007Z",
  },
  {
    _id: "61a411265527048981255b1e",
    userEmail: "Berta_McGlynn62@yahoo.com",
    amount: 934721668,
    type: "send",
    createdAt: "2020-11-15T17:53:15.463Z",
  },
];

export const transactionInputMock = {
  amount: 155000,
};

export const debitTransactionObjectMock = {
  _id: objId,
  userEmail,
  amount: 155000,
  type: "send",
  createdAt: "2021-12-03T02:27:52.617Z",
};

export const creditTransactionObjectMock = {
  userEmail,
  amount: 155000,
  type: "receive",
  createdAt: "2021-12-03T02:27:52.617Z",
};

export const mockTransferBody = {
  fromEmail: "john.smith_123@gmail.com",
  toEmail: "jane.jill@hotmail.com",
  amount: 2000,
};

export const mockCompletedTransferArray = [
  {
    userEmail: "john.smith_123@gmail.com",
    amount: 2000,
    type: "send",
    _id: "61a9a986e0685a3991d15968",
    createdAt: "2021-12-03T05:22:14.936Z",
  },
  {
    userEmail: "jane.jill@hotmail.com",
    amount: 2000,
    type: "receive",
    _id: "61a9a986e0685a3991d15969",
    createdAt: "2021-12-03T05:22:14.937Z",
  },
];

export const mockInvalidTransferBody = {
  fromEmail: "john.smith_123@gmail.com",
  toEmail: "jane.jill@hotmail.com",
  amount: -2000,
};
export const invalidTransferError = { msg: "-2000 is an invalid amount" };
