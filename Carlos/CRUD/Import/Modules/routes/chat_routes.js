
import { Message_treatment } from "../controller/chat_controller.js";

export function defineRoutes(req, res) {
    if (req.method === "POST") {
        Message_treatment(req, res);
    } else {
        res.writeHead(405, { 'content-type': 'text/plain' });
        res.end("Rota errada");
    }
}
// Essa função define as rotas para o servidor.
// Se a requisição for do tipo POST, ela irá processar os dados usando a função Message_treatment.
// Caso contrário, retorna um erro 405 indicando que o método HTTP não é permitido para essa rota.
