const express = require("express");
const login = require("");

const authAdminRouter = express.Router();

authAdminRouter.post("/login",login);

module.exports = authAdminRouter;