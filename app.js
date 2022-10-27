import express from "express";
import router from "./router.js";

const app = express().use(express.json()).use("/todos", router);
const PORT = 3000;

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
