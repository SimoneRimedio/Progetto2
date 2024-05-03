const express = require("express");
const getData = require("../../controllers/user/getData");
const getAutoComplete = require("../../controllers/user/getAutoComplete");

const userRouter = express.Router();

userRouter.get("/schedule",getData);
userRouter.get("/searchFor",getAutoComplete)

module.exports = userRouter;