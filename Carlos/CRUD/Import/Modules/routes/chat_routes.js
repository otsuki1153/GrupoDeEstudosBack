
import { Create_Message, Get_Message, Update_Message, Select_Message } from "../controller/chat_controller.js";

export function defineRoutes(req, res) {
    if (req.method === "POST") {
        Create_Message(req, res);
        //Se a requisição for do tipo POST, chama a função Create_Message para criar uma nova mensagem.
    } else if (req.method === "GET") {
        Get_Message(req, res);
        //Se a requisição for do tipo GET, chama a função Get_Message para obter as mensagens existentes.
    } else if (req.method === "PUT") {
        Update_Message(req, res);
        //Se a requisição for do tipo PUT, chama a função Update_Message para atualizar uma mensagem existente.
    } else if (req.method === "DELETE") {
        Select_Message(req, res);
        //Se a requisição for do tipo DELETE, chama a função Select_Message para deletar uma mensagem específica.
    } else {
        res.writeHead(405, { 'content-type': 'text/plain' });
        res.end("Rota errada");
        //Se a requisição não corresponder a nenhum dos métodos acima, retorna um erro 405 indicando que o método não é permitido.
    }
}
// Essa função define as rotas para o servidor.
