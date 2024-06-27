import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import "express-async-errors";
import cookieParser from "cookie-parser";

// routers
import authRouter from "./routers/auth.js";
import productRouter from "./routers/product.js";

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



//check out a better way to store this URL: localhost:3000/api/v1/users/register

// auth router
app.use("/api/v1/auth", authRouter);
// product router
app.use("/api/v1/products", authenticateUser, productRouter);

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
