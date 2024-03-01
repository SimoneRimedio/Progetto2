const express = require('express');
const bodyParser = require("body-parser");
const app = express();

require('dotenv').config();

const authAdminRouter = require("./src/routes/admin/authAdminRoutes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.use("/admin",authAdminRouter);


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})