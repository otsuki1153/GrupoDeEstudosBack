import {PostService, PutService, GetService, SearchService, DeleteService} from '../service/task.service.js';

export function controllPOST(req, res){
    let body = '';

    req.on('data', chunk =>{
        body += chunk;
    })

    req.on('end', ()=>{
        const JSONmsg = JSON.parse(body);
        const title = JSONmsg.title;
        const Postreturn = PostService(title);
        res.writeHead(200, {'content-type':'application/json'});
        res.end(Postreturn)
    })
}

export function controllPUT(req, res){
    let body = '';
    const url = new URL(req.url, `http://${req.headers.host}`)
    const idRecebido = parseInt(url.searchParams.get("id"));

    req.on('data', chunk =>{
        body += chunk;
    })

    req.on('end', ()=>{
        const putReturn = PutService(idRecebido, body);
        if(putReturn === -1){
            res.writeHead(404, {'content-type':'text/plain'});
            return res.end("item não encontrado") 
        }
        res.writeHead(200, {'content-type':'application/json'});
        res.end(putReturn)
    })
}

export function controllGET(res){
    const lista = GetService()
    res.writeHead(201, {'content-type':'application/json'});
    res.end(lista);
}


export function controllSEARCH(req, res){
    const url = new URL(req.url, `http://${req.headers.host}`)
    const idRecebido = parseInt(url.searchParams.get("id"));
    const searchReturn = SearchService(idRecebido);
    if(searchReturn === -1){
        res.writeHead(404, {'content-type':'text/plain'});
        return res.end("item não encontrado") 
    } 
    res.writeHead(201, {'content-type':'application/json'});
    res.end(searchReturn);
}


export function controllDELETE(req, res){
    const url = new URL(req.url, `http://${req.headers.host}`)
    const idRecebido = parseInt(url.searchParams.get("id"));
    const deleteReturn = DeleteService(idRecebido);
    if(deleteReturn === -1){
        res.writeHead(404, {'content-type':'text/plain'});
        return res.end("item não encontrado") 
    } 
    res.writeHead(200, {'content-type':'text/plain'});
    res.end(`item com o id ${idRecebido} apagado com sucesso`);
}