import { Router } from "express";
import { CreateController } from "../controller/game_controller.js";

const router = Router();

router.post('/', CreateController);

export default router;
