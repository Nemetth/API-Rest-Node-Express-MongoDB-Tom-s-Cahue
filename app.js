import { createInterface } from "readline";
import chalk from "chalk";
import mongoose from "mongoose";
import express from "express";
import "dotenv/config";
import path from "path";
mongoose
  .connect("mongodb://127.0.0.1/politicians", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado con la DB");
  })
  .catch(() => {
    console.log("Error con al conectar con la DB");
  });

const app = express();
const __dirname = path.resolve();
const port = process.env.PORT || 3002;

import presidentsRoutes from "./routes/presidentsRoutes.js";
import fixersRoutes from "./routes/fixersRoutes.js";
import auth from "./routes/auth.js";

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/presidents", presidentsRoutes);

app.use("/fixers", fixersRoutes);

app.use("/auth", auth);

app.get("/", function (req, res) {
  res.sendFile("./views/index.html", { root: __dirname });
});

app.listen(port, function () {
  console.log(`Server running on http://localhost:${port}`);
});
