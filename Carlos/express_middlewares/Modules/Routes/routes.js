import { Router } from "express";
import { GetControll, SearchControll, PostControll, PutControll, DeleteControll } from "../Controller/task.controller";

let router = Router();

router.get("/", GetControll);

router.get("/:id", SearchControll);

router.post("/", PostControll);

router.put("/:id", PutControll);

router.delete("/:id", DeleteControll);

export default router;