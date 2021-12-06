import supertest from "supertest";
import createServer from "../utils/server";
import UserModel from "../models/user.model";
import {
  mockedUser,
  userEmail,
  doesNotExistMsg,
  transTypeTotals,
  totalBalance,
  alreadyExistMsg,
  mockedUserInput,
  mockedUserUpdateInput,
  mockedUserUpdateEmailInput,
  mockedUserUpdated,
  transactionUpdateAck,
} from "./userTestObjects";
import TransactionModel from "../models/transaction.model";

const app = createServer();

describe("user", () => {
  describe("get user", () => {
    describe("given the user email does not exist", () => {
      it("should return 404", async () => {
        const getUserMock = jest
          .spyOn(UserModel, "findOne")
          //@ts-ignore
          .mockReturnValue(null);

        const { statusCode, body } = await supertest(app).get(`/api/user/${userEmail}`);

        expect(statusCode).toBe(404);
        expect(body).toEqual(doesNotExistMsg);

        expect(getUserMock).toHaveBeenCalled();
      });
    });

    describe("given the user email does exist", () => {
      it("should return 200", async () => {
        const getUserMock = jest
          .spyOn(UserModel, "findOne")
          // @ts-ignore
          .mockReturnValueOnce(mockedUser);

        const { statusCode, body } = await supertest(app).get(`/api/user/${userEmail}`);

        expect(statusCode).toBe(200);
        expect(body).toEqual(mockedUser);

        expect(getUserMock).toHaveBeenCalled();
      });
    });
  });
  describe("get user balance", () => {
    describe("given the user has made transactions", () => {
      it("should return 200 with aggregate balance", async () => {
        const userExistsMock = jest
          .spyOn(UserModel, "exists")
          //@ts-ignore
          .mockReturnValueOnce(true);

        const aggregateByTypeMock = jest
          .spyOn(TransactionModel, "aggregate")
          //@ts-ignore
          .mockReturnValueOnce(transTypeTotals);

        const { statusCode, body } = await supertest(app).get(`/api/user/${userEmail}/balance`);

        expect(statusCode).toBe(200);
        expect(body).toEqual(totalBalance);

        expect(userExistsMock).toHaveBeenCalled();
        expect(aggregateByTypeMock).toHaveBeenCalled();
      });
    });
    describe("given the user does not exist", () => {
      it("should return 404", async () => {
        const userExistsMock = jest
          .spyOn(UserModel, "exists")
          //@ts-ignore
          .mockReturnValueOnce(false);

        const aggregateByTypeMock = jest
          .spyOn(TransactionModel, "aggregate")
          //@ts-ignore
          .mockReturnValueOnce(transTypeTotals);

        const { statusCode, body } = await supertest(app).get(`/api/user/${userEmail}/balance`);

        expect(statusCode).toBe(404);
        expect(body).toEqual(doesNotExistMsg);

        expect(userExistsMock).toHaveBeenCalled();
        expect(aggregateByTypeMock).toHaveBeenCalledTimes(0);
      });
    });
  });
  describe("create user", () => {
    describe("given the user email is taken", () => {
      it("should return 409", async () => {
        const userExistsMock = jest
          .spyOn(UserModel, "exists")
          //@ts-ignore
          .mockReturnValueOnce(true);

        const userCreateMock = jest
          .spyOn(UserModel, "create")
          //@ts-ignore
          .mockReturnValueOnce(mockedUser);

        const { statusCode, body } = await supertest(app).post(`/api/user`).send(mockedUserInput);

        expect(statusCode).toBe(409);
        expect(body).toEqual(alreadyExistMsg);

        expect(userExistsMock).toHaveBeenCalled();
        expect(userCreateMock).toHaveBeenCalledTimes(0);
      });
    });

    describe("given the user email is not in use", () => {
      it("should return 201", async () => {
        const userExistsMock = jest
          .spyOn(UserModel, "exists")
          //@ts-ignore
          .mockReturnValueOnce(false);

        const userCreateMock = jest
          .spyOn(UserModel, "create")
          //@ts-ignore
          .mockReturnValueOnce(mockedUser);

        const { statusCode, body } = await supertest(app).post("/api/user").send(mockedUserInput);

        expect(statusCode).toBe(201);
        expect(body).toEqual(mockedUser);

        expect(userExistsMock).toHaveBeenCalled();
        expect(userCreateMock).toHaveBeenCalledWith(mockedUserInput);
      });
    });
  });
  describe("update user", () => {
    describe("given the user is updated successfully", () => {
      it("should return 200", async () => {
        const findUserMock = jest
          .spyOn(UserModel, "findOne")
          //@ts-ignore
          .mockReturnValueOnce(mockedUser);

        const updatedUserMock = jest
          .spyOn(UserModel, "findOneAndUpdate")
          //@ts-ignore
          .mockReturnValueOnce(mockedUserUpdated);

        const { statusCode, body } = await supertest(app)
          .put(`/api/user/${userEmail}`)
          .send(mockedUserUpdateInput);

        expect(statusCode).toBe(200);
        expect(body).toEqual(mockedUserUpdated);

        expect(findUserMock).toHaveBeenCalled();
        expect(updatedUserMock).toHaveBeenCalled();
      });
    });

    describe("given the users email is updated", () => {
      it("should return 200", async () => {
        const findUserMock = jest
          .spyOn(UserModel, "findOne")
          //@ts-ignore
          .mockReturnValueOnce(mockedUser);

        const updatedUserMock = jest
          .spyOn(UserModel, "findOneAndUpdate")
          //@ts-ignore
          .mockReturnValueOnce(mockedUserUpdated);

        const updatedUsersTransactionsMock = jest
          .spyOn(TransactionModel, "updateMany")
          //@ts-ignore
          .mockReturnValueOnce(transactionUpdateAck);

        const { statusCode, body } = await supertest(app)
          .put(`/api/user/${userEmail}`)
          .send(mockedUserUpdateEmailInput);

        expect(statusCode).toBe(200);
        expect(body).toEqual(mockedUserUpdated);

        expect(findUserMock).toHaveBeenCalled();
        expect(updatedUserMock).toHaveBeenCalled();
        expect(updatedUsersTransactionsMock).toHaveBeenCalled();
      });
    });
  });
});
