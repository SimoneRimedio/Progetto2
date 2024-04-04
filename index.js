const express = require('express');
const cors = require("cors")
const bodyParser = require("body-parser");
const app = express();

const authAdminRouter = require("./src/routes/admin/authAdminRoutes");


require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin",authAdminRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})