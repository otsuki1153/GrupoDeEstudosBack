import {createServer} from 'node:http';
import {routeCRUD, routeSearch} from './route/task.routes.js';

const port = 3000;
const hostname = '127.0.0.1';

const server = createServer((req,res)=>{
    const url = new URL(req.url, `http://${req.headers.host}`);

    if(url.pathname === "/task"){
        routeCRUD(req, res);
    } else if(url.pathname === "/pesquisa"){
        routeSearch(req, res);
    }else{
        res.writeHead(404, {'content-type':'text/plain'});
        res.end("Página não encontrada");
    }
});

server.listen(port, hostname, ()=>{
    console.log(`Server rodando no http://${hostname}:${port}/`);
});