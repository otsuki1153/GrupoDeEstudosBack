//Import do Service para ser direcionado pelo controller
import e from "express";
import { GetService, SearchService, PostService, PutService, DeleteService } from "Service/task.service.js";

export function GetControll (req, res) {
    const TaskList = GetService();
    res.json(TaskList);
}

export function SearchControll(req, res) {

    const ParamId = parseInt(req.params.id);

    if (isNaN(ParamId)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    const TaskList = SearchService(ParamId);

    if(TaskList === null) {
        return res.status(404).json({ error: "Objeto não encontrado" });
    }else {
        res.json(TaskList);
    }

}

export function PostControll(req, res) {

    const JSONTitle = req.body.title;

    const PostedTask = PostService(JSONTitle);
    res.status(201).json(PostedTask);

}

export function PutControll(req, res) {

    const ParamId = parseInt(req.params.id);
    if (isNaN(ParamId)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    const JSONBody = req.body;
    const UpdatedTask = PutService(ParamId, JSONBody);

    if(UpdatedTask === null) {
        return res.status(404).json({ error: "Objeto não encontrado" });
    } else {
        res.json(UpdatedTask);
    }

}

export function DeleteControll(req, res) {

    const ParamId = parseInt(req.params.id);
    if (isNaN(ParamId)) {
        return res.status(400).json({ error: "ID inválido" });
    }
    const DeletedTask = DeleteService(ParamId);

    if(!DeletedTask) {
        return res.status(404).json({ error: "Objeto não encontrado" });
    } else {
        res.status(204).send();
    }

}
