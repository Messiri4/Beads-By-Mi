import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import "express-async-errors";
import userRouter from "./routers/user.js";

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", userRouter);

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
