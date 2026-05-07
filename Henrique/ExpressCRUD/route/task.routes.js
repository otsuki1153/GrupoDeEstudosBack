import {Router} from "express";
import {GetControll, SearchControll, PostControll, PutControll, DeleteControll} from '../controller/task.controller.js'

const route = Router();

route.get("/", (req,res) =>{
    GetControll(req, res);
});

route.get("/:id", (req,res) =>{
    SearchControll(req, res);
});

route.post("/", (req,res) =>{
    PostControll(req, res);
});


route.put("/:id", (req,res) =>{
    PutControll(req, res);
});

route.delete("/:id", (req,res) =>{
    DeleteControll(req,res);
});

export default route;