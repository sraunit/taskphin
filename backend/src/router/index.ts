import {Router} from "express";
import authRouter from "./auth";
import docRouter from "./editor";
import * as authController from "../controllers/auth"
import * as docController from "../controllers/editor"
// import quizRouter from "./quiz";
// import teamRouter from "./team";
// import invitationRouter from "./invitation";
// import {PROTECTED} from "../middleware/auth";

const router = Router();

router.use("/auth", authRouter);
router.use("/document",authController.authenticate,docRouter);
// router.use("/team", PROTECTED, teamRouter);
// router.use("/invitation", PROTECTED, invitationRouter);
// router.use("/", homeRouter);

export default router;
