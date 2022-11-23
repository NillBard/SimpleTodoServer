import express from "express";
import router from "./Router/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()
  .use(cors({ origin: "http://localhost:3000", credentials: true }))
  .use(cookieParser("SECRET_KEY"))
  .use(express.json())
  .use("/api", router);
const PORT = 5000;

const start = () => {
  try {
    app.listen(PORT, () =>
      console.log(`Server has been started on port: ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
