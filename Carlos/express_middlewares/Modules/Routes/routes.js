import { Router } from "express";
//Import dos controllers para serem usados nas rotas

let router = Router();

router.get("/", GetControll);

router.get("/:id", SearchControll);

router.post("/", PostControll);

router.put("/:id", PutControll);

router.delete("/:id", DeleteControll);

export default router;