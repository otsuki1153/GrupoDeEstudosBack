//Import do Service para ser direcionado pelo controller
import e from "express";
import { GetService, SearchService, PostService, PutService, DeleteService } from "Service/task.service.js";

export function GetControll (req, res) {
    // Instancia a lista de taks do service
    const TaskList = GetService();
    // Retorna a lista em formato JSON 
    res.json(TaskList);
}

export function SearchControll(req, res) {
    // Guarda o ID recebido no parâmetro
    const ParamId = parseInt(req.params.id);

    // Verifica se o ID é inválido, retornando erro caso não seja
    if (isNaN(ParamId)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    // Instancia a task de acordo com o ID
    const TaskList = SearchService(ParamId);

    //Verifica se a task foi encontrada, retornando erro caso não for
    if(TaskList === null) {
        return res.status(404).json({ error: "Objeto não encontrado" });
    }else {
        // Retorna em JSON o resultado
        res.json(TaskList);
    }

}

export function PostControll(req, res) {
    // Quarda o título do objeto
    const JSONTitle = req.body.title;

    // Utiliza a função PostService atribuindo o título ao parâmetro
    const PostedTask = PostService(JSONTitle);
    // Retorna em JSON o resultado
    res.status(201).json(PostedTask);

}

export function PutControll(req, res) {
    // Guarda o ID recebido no parâmetro
    const ParamId = parseInt(req.params.id);

    // Verifica se o ID é valido, retornando erro caso não seja
    if (isNaN(ParamId)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    // Guarda o body da requisição
    const JSONBody = req.body;
    // Guarda o resultado do PutService do ID e corpo da requisição
    const UpdatedTask = PutService(ParamId, JSONBody);

    // Verifica se o objeto foi encontrado, retornando erro caso foi
    if(UpdatedTask === null) {
        return res.status(404).json({ error: "Objeto não encontrado" });
    } else {
        // Retorna em JSON o resultado
        res.json(UpdatedTask);
    }

}

export function DeleteControll(req, res) {
    // Guarda o ID recebido no parâmetro
    const ParamId = parseInt(req.params.id);

    // Verifica se o ID é valido, retornando erro caso não seja
    if (isNaN(ParamId)) {
        return res.status(400).json({ error: "ID inválido" });
    }
    // Guarda o resultado do DeleteService do ID da Requisição
    const DeletedTask = DeleteService(ParamId);

    // Verifica se o objeto foi encontrado, retornando erro caso foi
    if(!DeletedTask) {
        return res.status(404).json({ error: "Objeto não encontrado" });
    } else {
        // Retorna o sucesso da operação
        res.status(204).send();
    }

}
