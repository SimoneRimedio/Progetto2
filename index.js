const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const userRouter = require("./src/routes/user/userRoutes");
const AdminRouter = require("./src/routes/admin/adminRoutes");

require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", userRouter);
app.use("/admin", AdminRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
