import supertest from "supertest";
import createServer from "../utils/server";
import UserModel from "../models/user.model";
import TransactionModel from "../models/transaction.model";
import {
  transactionsMock,
  userEmail,
  debitTransactionObjectMock,
  creditTransactionObjectMock,
  transactionInputMock,
  mockedUser,
  mockedUser2,
  userEmail2,
  mockTransferBody,
  mockCompletedTransferArray,
  mockInvalidTransferBody,
  invalidTransferError,
} from "./transactionTestObjects";

const app = createServer();

describe("transaction", () => {
  describe("get user transactions", () => {
    describe("given the user has made transactions", () => {
      it("should return 200", async () => {
        const getTransactionsMock = jest
          .spyOn(TransactionModel, "find")
          //@ts-ignore
          .mockReturnValue(transactionsMock);

        const { statusCode, body } = await supertest(app).get(`/api/transactions/${userEmail}`);

        expect(statusCode).toBe(200);
        expect(body).toEqual(transactionsMock);

        expect(getTransactionsMock).toHaveBeenCalled();
      });
    });
  });

  describe("debit a user", () => {
    describe("given the user account exists", () => {
      it("should return 201", async () => {
        const userExistsMock = jest
          .spyOn(UserModel, "exists")
          //@ts-ignore
          .mockReturnValueOnce(true);

        const debitTransactionMock = jest
          .spyOn(TransactionModel, "create")
          //@ts-ignore
          .mockReturnValueOnce(debitTransactionObjectMock);

        const { statusCode, body } = await supertest(app)
          .post(`/api/transactions/${userEmail}/debit`)
          .send(transactionInputMock);

        expect(statusCode).toBe(201);
        expect(body).toEqual(debitTransactionObjectMock);

        expect(userExistsMock).toHaveBeenCalled();
        expect(debitTransactionMock).toHaveBeenCalled();
      });
    });
  });

  describe("credit a user", () => {
    describe("given the user account exists", () => {
      it("should return 201", async () => {
        const userExistsMock = jest
          .spyOn(UserModel, "exists")
          //@ts-ignore
          .mockReturnValueOnce(true);

        const creditTransactionMock = jest
          .spyOn(TransactionModel, "create")
          //@ts-ignore
          .mockReturnValueOnce(creditTransactionObjectMock);

        const { statusCode, body } = await supertest(app)
          .post(`/api/transactions/${userEmail}/credit`)
          .send(transactionInputMock);

        expect(statusCode).toBe(201);
        expect(body).toEqual(creditTransactionObjectMock);

        expect(userExistsMock).toHaveBeenCalled();
        expect(creditTransactionMock).toHaveBeenCalled();
      });
    });
  });

  describe("transfer amount from one user to another", () => {
    describe("given both the users exist and valid amount", () => {
      it("should return 201", async () => {
        const userExistsMock = jest
          .spyOn(UserModel, "findOne")
          //@ts-ignore
          .mockReturnValueOnce(mockedUser)
          //@ts-ignore
          .mockReturnValueOnce(mockedUser2);

        const insertTransactionMock = jest
          .spyOn(TransactionModel, "insertMany")
          //@ts-ignore
          .mockReturnValueOnce(mockCompletedTransferArray);

        const { statusCode, body } = await supertest(app)
          .post(`/api/transactions/transfer`)
          .send(mockTransferBody);

        expect(statusCode).toBe(201);
        expect(body).toEqual(mockCompletedTransferArray);

        expect(userExistsMock).toHaveBeenCalledTimes(2);
        expect(insertTransactionMock).toHaveBeenCalled();
      });
    });

    describe("given an invalid amount", () => {
      it("should return 400", async () => {
        const userExistsMock = jest
          .spyOn(UserModel, "findOne")
          //@ts-ignore
          .mockReturnValueOnce(mockedUser)
          //@ts-ignore
          .mockReturnValueOnce(mockedUser2);

        const insertTransactionMock = jest
          .spyOn(TransactionModel, "insertMany")
          //@ts-ignore
          .mockReturnValueOnce(mockCompletedTransferArray);

        const { statusCode, body } = await supertest(app)
          .post(`/api/transactions/transfer`)
          .send(mockInvalidTransferBody);

        expect(statusCode).toBe(400);
        expect(body).toEqual(invalidTransferError);

        expect(userExistsMock).toHaveBeenCalledTimes(2);
        expect(insertTransactionMock).toHaveBeenCalledTimes(0);
      });
    });
  });
});
