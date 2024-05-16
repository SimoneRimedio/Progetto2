import { Router } from "express";
import login from "../../controllers/admin/adminLoginController";
import dbUpdate from "../../controllers/admin/adminPageController";
import { single } from "../../middlewares/upload";

const adminRouter = Router();

adminRouter.post("/login", login);
adminRouter.put("/settings", single("DBfile"), dbUpdate);

export default adminRouter;
