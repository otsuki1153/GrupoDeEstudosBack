import {controllPOST, controllPUT, controllGET, controllSEARCH, controllDELETE} from '../controller/task.controller.js';

export function routeCRUD(req, res){
    if(req.method === "POST"){
        controllPOST(req,res);
    }else if(req.method === "PUT"){
        controllPUT(req, res);
    } else if(req.method === "GET"){
        controllGET(res);
    } else if(req.method === "DELETE"){
        controllDELETE(req, res);
    } else{
        res.writeHead(404,{'content-type':'text/plain'});
        res.end("Rota inexistente");
    }
}

export function routeSearch(req, res){
    if(req.method == "GET"){
        controllSEARCH(req, res);
    } else{
        res.writeHead(404,{'content-type':'text/plain'});
        res.end("Rota inexistente");
    }
}