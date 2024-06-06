import { Router } from "express";
import login from "../../controllers/admin/adminLoginController.js";
import dbUpdate from "../../controllers/admin/adminPageController.js";
import upload from "../../middlewares/upload.js";

const AdminRouter = Router();

AdminRouter.post("/login", login);
AdminRouter.put("/settings", upload.single("DBfile"), dbUpdate);

export default AdminRouter;
