import {Router} from "express";
import * as authController from "../../controllers/auth";

const router = Router();

// router.post("/register", authController.registerUser);
// router.get("/login", authController);
router.post("/register",authController.register)
router.post("/login",authController.login);
// router.post("/admin/register", authController.registerAdmin);
// router.post("/admin/login", authController.loginAdmin);

export default router;