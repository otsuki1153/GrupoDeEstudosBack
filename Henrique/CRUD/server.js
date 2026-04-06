import {createServer} from 'node:http';

//código com finalidade de criar um CRUD em JS usando node js (sem o uso de framework) com dados na memória sobre tarefas em formato JSON

// Array para manter as tarefas na memória sem persistência de dados
let tarefas = [];

// variavel id para indexar cada elemento da lista para facilitar manipulação de dados
let id = 1;

// constante onde será armarzenado a porta(especificação digital para localizar o servidor)
const port = 3000;

// constante onde será armazenado o host(endereço de destino que o servidor usa para "ouvir" as chamadas que chegam)
const hostname = '127.0.0.1'; // este endereço é conhecido como loopback, servindo como endereço que aponta para dentro da maquina (só o computador que roda o código pode acessar o servidor)

// constante onde será instanciado o servidor
const server = createServer((req, res) =>{

    // constante que instancia o objeto URL que recebe de parâmetro o final da url da requisição e o corpo inteiro da url
    const url = new URL(req.url, `http://${req.headers.host}`);

    //condicional onde verifica se a rota é "/tarefas" e verifica se o methodo da requisição (metodo http) é GET, assim caso seja verdadeira a condição irá retornar a lista inteira de tarefas em JSON, mostrando todos os itens do array
    if(url.pathname === "/tarefas" && req.method === "GET"){
        res.writeHead(200, {'content-type': 'application/json'})
        res.end(JSON.stringify(tarefas));
    } 
    
    //condicional onde verifica se a rota é "/tarefas" e verifica se o methodo da requisição (metodo http) é POST, assim caso seja verdadeira a condição irá tratar os dados mesclando os pacotes de informação em uma string para assim transformar em JSON e adiciona ao array tarefas mostrando no final as tarefas adicionadas
    else if(url.pathname === "/tarefas" && req.method === "POST"){
        let body = '';

        req.on('data', chunk =>{
            body += chunk;
        })

        req.on('end', () =>{
            const novaTarefa = JSON.parse(body);
            novaTarefa.id = id++;

            tarefas.push(novaTarefa);
            

            res.writeHead(201, {'content-type': 'application/json'});
            res.end(JSON.stringify(novaTarefa));
        });
    }  
    
    //condicional onde verifica se a rota é "/tarefas" e verifica se o methodo da requisição (metodo http) é PUT, assim caso seja verdadeira a condição irá tratar os dados mesclando os pacotes de informação em uma string para assim transformar em JSON e subscrever as informações do item escolhido por meio do parametro da url passada pelo usuario no array tarefas mostrando no final a tarefa subscrevida
    else if(url.pathname === "/tarefas" && req.method === "PUT"){
        const idRecebido = parseInt(url.searchParams.get("id"));

        let body = '';

        req.on('data', chunk =>{
            body += chunk;
        })

        req.on('end', () =>{
            const dadosAtualizados = JSON.parse(body);

            const index = tarefas.findIndex(t => t.id === idRecebido);

            if(index === -1){
                res.writeHead(404, {'content-type': 'text/plain'});
                return res.end("Tarefa não encontrada");
            }

            tarefas[index] = {
                ...tarefas[index],
                ...dadosAtualizados
            };

            res.writeHead(200, {'content-type': 'application/json'});
            res.end(JSON.stringify(tarefas[index]));
        });
    } 

    //condicional onde verifica se a rota é "/tarefas" e verifica se o methodo da requisição (metodo http) é DELETE, assim caso seja verdadeira a condição, irá deletar o item na posição passada pelo usuário por meio do parâmetro da url
    else if(url.pathname === "/tarefas" && req.method === "DELETE"){

        const idRecebido = parseInt(url.searchParams.get("id"));
        const index = tarefas.findIndex(t => t.id === idRecebido);

        if(index === -1){
            res.writeHead(404, {'content-type':'text/plain'});
            return res.end("Tarefa não encontrada");
        }

        tarefas.splice(index, 1);

        res.writeHead(204);
        res.end();
    }

    //condicional onde verifica se a rota é "/tarefas" e verifica se o methodo da requisição (metodo http) é GET, assim caso seja verdadeira a condição, irá mostrar o item na posição passada pelo usuário por meio do parâmetro da url
    else if(url.pathname === "/pesquisa" && req.method === "GET"){
        const id = parseInt(url.searchParams.get("id"));
        const index = tarefas.findIndex(t => t.id === id);

        if(index === -1){
            res.writeHead(404, {'content-type': 'text/plain'});
            return res.end("Usuário não encontrado");
        }

        res.writeHead(200, {'content-type':'application/json'});
        res.end(JSON.stringify(tarefas[index]));
    }
});

// método do objeto Server onde quando ele o servidor for aberto ele irá printar no terminal qual a URL para acessar e fazer requisições do servidor
server.listen(port, hostname, ()=>{
    console.log(`Server rodando no http://${hostname}:${port}/`);
});
