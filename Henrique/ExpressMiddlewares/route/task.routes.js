import {Router} from "express";
import {GetControll, SearchControll, PostControll, PutControll, DeleteControll} from '../controller/task.controller.js'

const route = Router();

route.get("/", GetControll);

route.get("/:id", SearchControll);

route.post("/", PostControll);


route.put("/:id", PutControll);

route.delete("/:id", DeleteControll);

export default route;
