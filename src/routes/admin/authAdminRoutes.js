const express = require("express");
const login = require("../../controllers/admin/adminLoginController");

const authAdminRouter = express.Router();

authAdminRouter.post("/login",login);

module.exports = authAdminRouter;