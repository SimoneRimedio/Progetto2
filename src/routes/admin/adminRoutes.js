const express = require("express");
const login = require("../../controllers/admin/adminLoginController");
const dbUpdate = require("../../controllers/admin/adminPageController");
const upload = require("../../middlewares/upload");

const adminRouter = express.Router();

adminRouter.post("/login",login);
adminRouter.put("/settings",upload.single('DBfile'),dbUpdate)

module.exports = adminRouter;

