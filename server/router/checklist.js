import { Router } from "express";
import checklistController from "../controllers/checklist.js";
import userController from "../controllers/user.js";

const router = new Router();

router.get("/myChecklists/:num", checklistController.getMyChecklists);
router.get("/oneChecklists/:user/:title", checklistController.getOneChecklist);
router.get("/checklists/:num", checklistController.getChecklists);
router.get("/getCount", checklistController.getCount);

router.post("/create", userController.checkAuth, checklistController.create);
router.patch("/update", userController.checkAuth, checklistController.update);
router.delete("/delete", userController.checkAuth, checklistController.delete);

export default router;
