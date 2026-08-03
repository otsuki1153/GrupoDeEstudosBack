import { Build_Return } from "../service/chat_service.js";

export function Message_treatment(req, res) {
    let mensagem = "";

    req.on("data", (chunk) => {
        mensagem += chunk;
    });
    //Aqui estamos ouvindo o evento "data" da requisição, que é acionado quando os dados são recebidos. 
    //A cada pedaço de dados recebido, ele é adicionado à variável "mensagem".

    req.on("end", () => {
        const mensageJson = JSON.parse(mensagem);
        const text = mensageJson.text;
        const returnObj = Build_Return(text);

        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(returnObj));
    });
    //Aqui estamos ouvindo o evento "end" da requisição, que é acionado quando todos os dados foram recebidos. 

}
//O código trata os dados recebidos em uma requisição HTTP, processa o texto usando a função Build_Return e retorna a resposta em formato JSON para o cliente.
