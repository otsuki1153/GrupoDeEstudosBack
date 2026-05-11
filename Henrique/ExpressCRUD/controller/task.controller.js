import {GetService, PostService, PutService, DeleteService, SearchService} from '../service/task.service.js'

export function GetControll(req, res){
    const Objlist = GetService();
    return res.json(Objlist); 
}

export function SearchControll(req, res){
    const ParamId = parseInt(req.params.id);

    if (isNaN(ParamId)) {
        return res.status(400).send("ID inválido");
    }

    const Objlist = SearchService(ParamId);

    if(Objlist === null){
        return res.status(404).send("Tarefa não encontrada");
    } else{
        res.json(Objlist); 
    }
}

export function PostControll(req,res){
    const JSONtitle = req.body.title;
    if(JSONtitle === null){
        return res.status(400).send("Corpo incompleto");
    }
    const PostedOBJ = PostService(JSONtitle);
    res.status(201).json(PostedOBJ);
}

export function PutControll(req,res){
    const ParamId = parseInt(req.params.id);
    if (isNaN(ParamId)) {
        return res.status(400).send("ID inválido");
    }
    const JSONbody = req.body;
    const AlteredOBJ = PutService(JSONbody, ParamId);

    if (AlteredOBJ === null){
        res.status(404).send("Tarefa não encontrada");
    } else{
        res.json(AlteredOBJ);
    }
}

export function DeleteControll(req,res){
    const ParamId = parseInt(req.params.id);
    if (isNaN(ParamId)) {
        return res.status(400).send("ID inválido");
    }
    const ItemDeleted = DeleteService(ParamId);

    if(!ItemDeleted){
        res.status(404).send("Tarefa não encontrada");
    } else{
        res.status(204).send();
    }
}
