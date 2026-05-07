import { Build_Return, Get_Static_Message, Update_Data, Delete_Message } from "../service/chat_service.js";

export function Create_Message(req, res) {//Post
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

export function Get_Message(req, res) {//Get
    const Message_Static = Get_Static_Message();
    //Aqui estamos chamando a função Get_Static_Message para obter a mensagem estática que será retornada na resposta da requisição GET.

    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(Message_Static));
}
//Essa função lida com as requisições GET, retornando uma mensagem estática em formato JSON. Transforma o objeto gerado pela função Get_Static_Message diretamente em string JSON.

export function Update_Message(req, res) {//Put

    let mensagem = "";

    const url = new URL(req.url, `http://${req.headers.host}`);
    //Aqui estamos criando um objeto URL a partir da URL da requisição e do host, o que nos permite acessar os parâmetros da URL de forma mais fácil.

    const IdRecebido = url.searchParams.get("id");
    //Aqui estamos obtendo o ID da mensagem a ser atualizada a partir dos parâmetros da URL. O ID é usado para identificar qual mensagem deve ser atualizada.

    req.on("data", (chunk) => {
        mensagem += chunk;
    });
    //Aqui estamos ouvindo o evento "data" da requisição, que é acionado quando os dados são recebidos. A cada pedaço de dados recebido, ele é adicionado à variável "mensagem".

    req.on("end", () => {

        try {
            // TENTAMOS fazer o parse do JSON e prosseguir com a atualização
            mensagem = JSON.parse(mensagem);
            const MensagemAtualizada = Update_Data(IdRecebido, mensagem.text);
            //Aqui estamos chamando a função Update_Data, passando o ID da mensagem a ser atualizada e o novo conteúdo da mensagem. A função Update_Data será responsável por realizar a atualização da mensagem no armazenamento de dados. 

            res.writeHead(200, { 'content-type': 'application/json' });
            res.end(JSON.stringify(MensagemAtualizada));
        } catch (error) {
            // SE der erro na formatação do JSON recebido, a "rede de segurança" captura o erro aqui e evita o crash do servidor.
            res.writeHead(400, { 'content-type': 'application/json' });
            res.end(JSON.stringify({ erro: "O formato do JSON enviado é inválido. Verifique as aspas e chaves." }));
        }

    });

}

export function Select_Message(req, res) {//Delete

    const URL = new URL(req.url, `http://${req.headers.host}`);
    //Aqui estamos criando um objeto URL a partir da URL da requisição e do host, o que nos permite acessar os parâmetros da URL de forma mais fácil.

    let id_recebido = parseInt(URL.searchParams.get("id"));
    // Aqui estamos obtendo o ID da mensagem a ser deletada a partir dos parâmetros da URL. O ID é usado para identificar qual mensagem deve ser deletada. 
    // O parseInt é usado para converter o ID de string para número inteiro, garantindo que seja do tipo correto para a função Delete_Message.

    Delete_Message(id_recebido);
    //Aqui estamos chamando a função Delete_Message, passando o ID da mensagem a ser deletada.

}
