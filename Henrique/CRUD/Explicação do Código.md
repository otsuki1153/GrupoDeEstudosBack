📘 CRUD de Tarefas com Node.js Puro
📌 Introdução

O projeto CRUD tem como objetivo demonstrar a construção de uma API REST completa utilizando exclusivamente recursos nativos do Node.js, sem a utilização de frameworks como Express.

A aplicação implementa as quatro operações fundamentais de um sistema CRUD (Create, Read, Update, Delete) para o gerenciamento de tarefas, armazenando os dados temporariamente em memória por meio de um array JavaScript.

As funcionalidades disponíveis são:

Criar novas tarefas
Listar todas as tarefas
Buscar uma tarefa específica por ID
Atualizar tarefas existentes
Remover tarefas

Como não há integração com banco de dados, todas as informações são armazenadas em memória RAM e são perdidas quando o servidor é encerrado.

🏗️ Arquitetura da Aplicação
Cliente (Postman / Front-end)
            ↓
        server.js
            ↓
     Roteamento Manual
            ↓
 Manipulação do Array tarefas[]
            ↓
      Resposta HTTP
🌐 Endpoints Disponíveis
Método	Endpoint	Descrição
GET	/tarefas	Lista todas as tarefas
POST	/tarefas	Cria uma nova tarefa
PUT	/tarefas?id=1	Atualiza uma tarefa existente
DELETE	/tarefas?id=1	Remove uma tarefa
GET	/pesquisa?id=1	Busca uma tarefa por ID
📘 Código
📌 Dependência Utilizada
import { createServer } from 'node:http';
Descrição

O módulo node:http faz parte da biblioteca padrão do Node.js e fornece os recursos necessários para criação de servidores HTTP.

A função createServer() é responsável por instanciar o servidor e registrar a função que será executada sempre que uma requisição for recebida.

🗂️ Estruturas de Dados
let tarefas = [];
let id = 1;
Descrição
tarefas: array que armazena temporariamente todas as tarefas.
id: contador utilizado para gerar identificadores únicos.
🌐 Configuração do Servidor
const port = 3000;
const hostname = '127.0.0.1';
Descrição
port: define a porta TCP utilizada pelo servidor.
hostname: endereço local de execução (localhost).
🚀 Criação do Servidor
const server = createServer((req, res) => {
Parâmetros
req (IncomingMessage): contém os dados da requisição.
res (ServerResponse): utilizado para enviar a resposta ao cliente.
🔗 Processamento da URL
const url = new URL(req.url, `http://${req.headers.host}`);
Descrição

Cria um objeto URL completo, permitindo acessar:

url.pathname → caminho da rota.
url.searchParams → parâmetros de consulta.
📄 GET /tarefas

Retorna todas as tarefas armazenadas.

res.writeHead(200, {'content-type': 'application/json'});
res.end(JSON.stringify(tarefas));
📄 POST /tarefas

Cria uma nova tarefa.

Etapas
Lê o corpo da requisição com req.on('data').
Finaliza a leitura com req.on('end').
Converte o conteúdo para JSON.
Gera um ID único.
Insere no array tarefas.
Retorna a tarefa criada.
📄 PUT /tarefas?id=1

Atualiza uma tarefa existente.

Etapas
Obtém o id via searchParams.
Localiza a tarefa com findIndex().
Valida se a tarefa existe.
Mescla os dados com o operador spread (...).
Retorna a tarefa atualizada.
📄 DELETE /tarefas?id=1

Remove uma tarefa.

Etapas
Obtém o ID.
Localiza a posição no array.
Remove com splice().
Retorna status HTTP 204 No Content.
📄 GET /pesquisa?id=1

Busca uma tarefa específica pelo ID.

Etapas
Obtém o ID via URL.
Localiza a tarefa com findIndex().
Retorna o objeto encontrado em JSON.
Caso não exista, retorna erro 404.
▶️ Inicialização do Servidor
server.listen(port, hostname, () => {
    console.log(`Server rodando no http://${hostname}:${port}/`);
});
Descrição

Inicia o servidor e passa a escutar requisições na URL configurada.

🔄 Fluxo de Execução
Requisição HTTP recebida
        ↓
Criação do objeto URL
        ↓
Verificação da rota e método HTTP
        ↓
Execução da operação correspondente
        ↓
Manipulação do array tarefas[]
        ↓
Envio da resposta ao cliente
📚 Conceitos Aplicados
Criação de servidor HTTP com Node.js
Roteamento manual
Métodos HTTP
Streams (data e end)
JSON (parse e stringify)
Manipulação de arrays
findIndex()
splice()
Operador spread (...)
Códigos de status HTTP
📌 Conclusão

Este projeto demonstra de forma detalhada a implementação de um CRUD completo utilizando apenas recursos nativos do Node.js, sem qualquer abstração fornecida por frameworks.

A construção manual do roteamento, da leitura do corpo das requisições e da manipulação das respostas HTTP permite compreender profundamente o funcionamento interno de uma API backend.

Ao longo do desenvolvimento, são consolidados conceitos fundamentais como:

Arquitetura de APIs REST
Manipulação de URLs
Tratamento de métodos HTTP
Processamento de JSON
Estruturas de dados em memória
Códigos de status HTTP

Apesar de simples, o projeto reproduz os mesmos princípios utilizados em aplicações profissionais e constitui uma excelente base acadêmica para estudos de JavaScript, Node.js e desenvolvimento backend, preparando o desenvolvedor para evoluir posteriormente para frameworks como Express, integração com bancos de dados, autenticação e arquiteturas mais robustas.
