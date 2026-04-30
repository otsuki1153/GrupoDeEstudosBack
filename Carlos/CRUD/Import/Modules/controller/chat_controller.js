import { Build_Return, Get_Static_Message } from "../service/chat_service.js";

export function Create_Message(req, res) {
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
//O código trata os dados recebidos em uma requisição HTTP, processa o texto usando a função Build_Return e retorna a resposta em formato JSON para o cliente

export function Get_Message(req, res) {
    const Message_Static = Get_Static_Message();
    //Aqui estamos chamando a função Get_Static_Message para obter a mensagem estática que será retornada na resposta da requisição GET.

    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(Message_Static));
}
//Essa função lida com as requisições GET, retornando uma mensagem estática em formato JSON. Transforma o objeto gerado pela função Get_Static_Message diretamente em string JSON.
