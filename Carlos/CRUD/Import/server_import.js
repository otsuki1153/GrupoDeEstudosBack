import { createServer } from 'node:http';
// Ajustado o caminho para a pasta correta do seu módulo de rotas
import { defineRoutes } from './Modules/routes/chat_routes.js';


const port = 3000;
const hostname = '127.0.0.1';

const server = createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname === "/message") {
        defineRoutes(req, res);
    } else {
        res.writeHead(404, { 'content-type': 'text/plain' });
        res.end("Rota não encontrada"); // O res.end é obrigatório para não travar a requisição
    }
});
// Cria um servidor HTTP usando a função createServer do módulo 'http'. 
// O servidor escuta as requisições e, se a rota for "/message", chama a função defineRoutes para lidar com a requisição. Caso contrário, retorna um erro 404.

server.listen(port, hostname, () => {
    console.log(`Server rodando no http://${hostname}:${port}/`);
});
// Inicia o servidor e exibe uma mensagem no console indicando que o servidor está rodando