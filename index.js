import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
const app = express();

import userRouter from "./src/routes/user/userRoutes";
import AdminRouter from "./src/routes/admin/adminRoutes";

require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/", userRouter);
app.use("/admin", AdminRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
