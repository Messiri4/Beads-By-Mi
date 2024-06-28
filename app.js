import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import "express-async-errors";
import cookieParser from "cookie-parser";

// Routes
import authRouter from "./routers/auth.js";
import productRouter from "./routers/product.js";
import userRouter from "./routers/users.js";
import orderRouter from "./routers/order.js";
import categoryRouter from "./routers/categories.js";

// middleware
import errorHandler from "./middleware/errorHandler.js";
import { authenticateUser } from "./middleware/auth.js";

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const api = process.env.API_URL;

// auth router
app.use("/api/v1/auth", authRouter);

// routers
app.use("/api/v1/products", authenticateUser, productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/categories", categoryRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandler);

const port = process.env.PORT || 3000;

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    app.listen(port, () => {
      console.log(`server listening on PORT ` + port);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDb();
