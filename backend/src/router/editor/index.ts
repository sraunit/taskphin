import { Router } from "express";
import * as docController from "../../controllers/editor";
const router = Router();

router.post("/",docController.createDocument);
router.delete("/",docController.deleteDocument);
router.get("/",docController.getDocuments);
router.get("/download/:title",docController.downloadDocument);
export default router;