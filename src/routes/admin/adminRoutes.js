import { Router } from "express";
import login from "../../controllers/admin/adminLoginController.js";
import dbUpdate from "../../controllers/admin/adminPageController.js";
import upload from "../../middlewares/upload.js";
import jwtVerifier from "../../middlewares/jwtVerifier.js";

const AdminRouter = Router();

AdminRouter.post("/login", jwtVerifier, login);
AdminRouter.put("/settings", upload.single("DBfile"), dbUpdate);

export default AdminRouter;
