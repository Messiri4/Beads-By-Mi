import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import "express-async-errors";
import userRouter from "./routers/user.js";
import productRouter from "./routers/product.js";

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

 //localhost:3000/api/v1/users/register
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

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
