import express from "express";
import {
  createUserHandler,
  getUserHandler,
  updateUserHandler,
} from "../controller/user.controller";
import { getCurrentBalanceHandler } from "../controller/transaction.controller";
import validateUser from "../middleware/validateUser";

const userRouter: express.Router = express.Router();

userRouter.get("/:email", getUserHandler);
userRouter.get("/:email/balance", getCurrentBalanceHandler);
userRouter.post("/", validateUser, createUserHandler);
userRouter.put("/:email", validateUser, updateUserHandler);

export default userRouter;
