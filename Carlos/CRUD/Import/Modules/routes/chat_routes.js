
import { Create_Message, Get_Message, Update_Message, Select_Message } from "../controller/chat_controller.js";

export function defineRoutes(req, res) {
    if (req.method === "POST") {
        Create_Message(req, res);
    } else if (req.method === "GET") {
        Get_Message(req, res);
    } else if (req.method === "PUT") {
        Update_Message(req, res);
    } else if (req.method === "DELETE") {
        Select_Message(req, res);
    } else {
        res.writeHead(405, { 'content-type': 'text/plain' });
        res.end("Rota errada");
    }
}
// Essa função define as rotas para o servidor.
//Se a requisição for do tipo POST, chama a função Create_Message para lidar com a criação de uma nova mensagem.
//Se a requisição for do tipo GET, chama a função Get_Message para lidar com a obtenção de uma mensagem estática.
//Se a requisição for de outro tipo, retorna um erro 405 indicando que o método HTTP não é permitido para essa rota.

