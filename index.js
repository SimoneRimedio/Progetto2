import express from "express";
import cors from "cors";
import pkg from "body-parser";
import dotenv from "dotenv";
import UserRouter from "./src/routes/user/userRoutes.js";
import AdminRouter from "./src/routes/admin/adminRoutes.js";

dotenv.config();

const { json, urlencoded } = pkg;
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/", UserRouter);
app.use("/admin", AdminRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
