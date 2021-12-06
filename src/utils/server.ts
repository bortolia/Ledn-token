import express from "express";
import cors from "cors";
import userRouter from "../routes/userRouter";
import transactionRouter from "../routes/transactionRouter";
const createServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Defining routes
  app.use("/api/user", userRouter);
  app.use("/api/transactions", transactionRouter);
  return app;
};

export default createServer;
