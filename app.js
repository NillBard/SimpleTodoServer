import express from "express";
import router from "./Router/index.js";
import cors from "cors";
const app = express()
  .use(cors({ origin: "http://localhost:3000" }))
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
