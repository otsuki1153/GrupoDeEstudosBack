📘 Documentação — server.js (CRUD de Tarefas)
- Descrição

O arquivo server.js implementa um servidor HTTP utilizando Node.js puro, com o objetivo de demonstrar a criação de um CRUD (Create, Read, Update, Delete) sem o uso de frameworks.

Os dados são armazenados em memória por meio de um array, sem persistência em banco de dados, e manipulados através de diferentes rotas e métodos HTTP.

⚙️ Dependências
import { createServer } from 'node:http';
Descrição
createServer: função nativa do Node.js utilizada para criar servidores HTTP.

🗂️ Estruturas de Dados
let tarefas = [];
let id = 1;
- Descrição
tarefas: array utilizado para armazenar as tarefas em memória.
id: variável utilizada para gerar identificadores únicos para cada tarefa.

🌐 Configuração do Servidor
const port = 3000;
const hostname = '127.0.0.1';
- Descrição
port: porta onde o servidor será executado.
hostname: endereço local onde o servidor estará disponível.

🚀 Criação do Servidor
const server = createServer((req, res) =>{
- Parâmetros
req (IncomingMessage): contém os dados da requisição HTTP.
res (ServerResponse): utilizado para enviar a resposta ao cliente.
🔗 Processamento da URL
const url = new URL(req.url, `http://${req.headers.host}`);
- Descrição
req.url: caminho da requisição.
req.headers.host: host da requisição.
new URL(...): cria um objeto URL completo.
Propriedades utilizadas
url.pathname
url.searchParams
pathname: identifica a rota.
searchParams: acessa parâmetros da URL.

🔀 Definição de Rotas (CRUD)

📄 GET /tarefas (Listar todas as tarefas)
if(url.pathname === "/tarefas" && req.method === "GET"){
    res.writeHead(200, {'content-type': 'application/json'})
    res.end(JSON.stringify(tarefas));
}
- Descrição
Retorna todas as tarefas armazenadas no array.
Resposta no formato JSON.

📄 POST /tarefas (Criar nova tarefa)
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
- Descrição
Lê o corpo da requisição utilizando stream (data e end).
Converte o conteúdo para JSON.
Adiciona um identificador único (id).
Insere a nova tarefa no array tarefas.
Retorna a tarefa criada.

📄 PUT /tarefas (Atualizar tarefa)
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
- Descrição
Obtém o id da tarefa via parâmetro da URL.
Localiza a tarefa no array utilizando findIndex.
Atualiza os dados utilizando operador spread (...).
Retorna a tarefa atualizada.

📄 DELETE /tarefas (Remover tarefa)
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
- Descrição
Obtém o id via parâmetro da URL.
Localiza a tarefa no array.
Remove a tarefa utilizando splice.
Retorna status 204 (sem conteúdo).

📄 GET /pesquisa (Buscar tarefa por ID)
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
- Descrição
Obtém o id via parâmetro da URL.
Busca a tarefa correspondente.
Retorna a tarefa encontrada em formato JSON.

▶️ Inicialização do Servidor
server.listen(port, hostname, ()=>{
    console.log(`Server rodando no http://${hostname}:${port}/`);
});
- Descrição
Inicia o servidor HTTP.
Permite acesso através do endereço e porta definidos.
Exibe mensagem no terminal ao iniciar.

🔄 Fluxo de Execução
Requisição HTTP recebida
        ↓
Criação do objeto URL
        ↓
Verificação de pathname e método HTTP
        ↓
Execução da operação correspondente:
    GET /tarefas      → lista todas as tarefas
    POST /tarefas     → cria nova tarefa
    PUT /tarefas      → atualiza tarefa existente
    DELETE /tarefas   → remove tarefa
    GET /pesquisa     → busca tarefa por id
        ↓
Envio da resposta ao cliente

📚 Considerações

O código implementa um CRUD completo utilizando apenas recursos nativos do Node.js, incluindo:

Roteamento manual
Manipulação de métodos HTTP
Leitura de dados via streams
Uso de parâmetros de URL
Manipulação de dados em memória

Essa abordagem permite compreender de forma detalhada o funcionamento interno de uma API backend sem abstrações de frameworks.
