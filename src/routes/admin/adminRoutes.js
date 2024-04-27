const express = require("express");
const login = require("../../controllers/admin/adminLoginController");

const adminRouter = express.Router();

adminRouter.post("/login",login);

module.exports = adminRouter;