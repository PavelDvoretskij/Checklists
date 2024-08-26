import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./router/auth.js";
import checklistRouter from "./router/checklist.js";
import middlewareErrors from "./migglewares/middleware-errors.js";

const app = express();
dotenv.config();

// Constants
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);
app.use("/api", authRouter);
app.use("/api", checklistRouter);
app.use(middlewareErrors);

async function start() {
  try {
    await mongoose
      .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.cuteuzh.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
      )
      .then(() => console.log("DB ok"))
      .catch((err) => console.log("DB error", err));

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
