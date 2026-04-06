import {MessageTreatment} from '../controllers/chat.controller.js';

export function defineRoutes(req, res){
    if(req.method === "POST"){
        MessageTreatment(req, res);
    } else {
        res.writeHead(405, {'content-type': 'text/plain'});
        res.end("Rota errada");
    }
};
