import { Get_Service, Search_Service, Post_Service, Put_Service, Delete_Service } from "../service/task.service";

export function Get_Controll(req, res) {
    const Obj_List = Get_Service();
    res.json(Obj_List);
}

export function Search_Controll(req, res) {
    // req.params guarda os "parâmetros de rota" dinâmicos definidos na URL.
    const Param_Id = parseInt(req.params.id);

    if (isNaN(Param_Id)) {
        // res.status(400) muda o código HTTP da resposta para 400 (Bad Request)
        // O .send() envia a mensagem de texto como corpo da resposta.
        return res.status(400).send("ID inválido");
    }

    const Obj_List = Search_Service(Param_Id);

    if (Obj_List === null) {
        // Retorna 404 (Not Found) se o recurso buscado não existir.
        return res.status(404).send("ID não encontrado");
    } else {
        // Se encontrou, devolve o objeto em formato JSON.
        res.json(Obj_List);
    }
}

export function Post_Controll(req, res) {
    // req.body contém os dados enviados no corpo da requisição
    const JSON_Title = req.body.title;

    if (!JSON_Title) {
        return res.status(400).send("O campo 'title' é obrigatório.");
    }
    const Posted_Obj = Post_Service(JSON_Title);
    // res.status(201) informa sucesso na criação de um novo recurso (201 Created),
    // e logo em seguida o .json() envia o objeto criado de volta.
    res.status(201).json(Posted_Obj);
}

export function Put_Controll(req, res) {
    // Pega o ID da URL (req.params) para saber QUAL item atualizar.
    const Param_Id = parseInt(req.params.id);

    if (isNaN(Param_Id)) {
        return res.status(400).send("ID inválido");
    }

    // Pega o corpo completo da requisição (req.body) com os novos dados.
    const JSON_Body = req.body;
    const Altered_Obj = Put_Service(JSON_Body, Param_Id);

    if (Altered_Obj === null) {
        return res.status(404).send("ID não encontrado para atualização");
    } else {
        // Retorna o objeto após ser atualizado.
        res.json(Altered_Obj);
    }
}

export function Delete_Controll(req, res) {
    // Identifica o item a ser deletado através da URL.
    const Param_Id = parseInt(req.params.id);

    if (isNaN(Param_Id)) {
        return res.status(400).send("ID inválido");
    }

    const Obj_Deleted = Delete_Service(Param_Id);

    if (!Obj_Deleted) {
        return res.status(404).send("ID não encontrado para exclusão");
    } else {
        // status 204 (No Content) significa que a ação foi um sucesso 
        res.status(204).send();
    }
}
