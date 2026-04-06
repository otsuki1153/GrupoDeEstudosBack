import {createServer}  from 'node:http';
import {defineRoutes} from './routes/chat.routes.js'


const port = 3000;
const hostname = '127.0.0.1';

const server = createServer((req,res) =>{
    const url = new URL(req.url, `http://${req.headers.host}`);
    if(url.pathname === "/message"){
        defineRoutes(req, res);
    } else{
        res.writeHead(404, {'content-type':'text/plain'});
    }
});

server.listen(port, hostname, ()=>{
    console.log(`Server rodando no http://${hostname}:${port}/`);
});