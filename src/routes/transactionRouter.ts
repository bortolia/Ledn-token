import express from "express";
import {
  createCreditHandler,
  createDebitHandler,
  createTransferHandler,
  getTransactionsHandler,
} from "../controller/transaction.controller";

const transactionRouter: express.Router = express.Router();

transactionRouter.get("/:email", getTransactionsHandler);
transactionRouter.post("/:email/debit", createDebitHandler);
transactionRouter.post("/:email/credit", createCreditHandler);
transactionRouter.post("/transfer", createTransferHandler);

export default transactionRouter;
