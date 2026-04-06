import {buildReturn} from '../service/chat.service.js'

export function MessageTreatment(req, res){
    let mensagem = '';

    req.on('data', chunk =>{
        mensagem += chunk;
    })

    req.on('end', () =>{
        const mensagemJson = JSON.parse(mensagem);
        const text = mensagemJson.text;
        const returnObj = buildReturn(text);
        res.writeHead(200, {'content-type':'application/json'});
        res.end(JSON.stringify(returnObj));
    })
}
