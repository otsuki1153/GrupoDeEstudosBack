# 📘 CRUD Modular com Node.js Puro

## 📌 Introdução

Este projeto demonstra a implementação de um CRUD (Create, Read, Update, Delete) utilizando apenas recursos nativos do Node.js, sem o uso de frameworks como Express.

A aplicação está organizada em quatro camadas:

1. `server.js`
2. `route/task.routes.js`
3. `controller/task.controller.js`
4. `service/task.service.js`

Cada camada possui uma responsabilidade específica, permitindo melhor organização, manutenção e escalabilidade.

---

# 📘 Documentação — `server.js`

## 📌 Descrição

O arquivo `server.js` é o ponto de entrada da aplicação. Ele cria o servidor HTTP, interpreta a URL e encaminha a requisição para o módulo de rotas apropriado.

## ⚙️ Dependências

```javascript
import {createServer} from 'node:http';
import {routeCRUD, routeSearch} from './route/task.routes.js';
```

- `createServer`: função nativa do Node.js para criação de servidores HTTP.
- `routeCRUD`: trata as operações de CRUD.
- `routeSearch`: trata a busca de tarefas por ID.

## 🌐 Configuração do Servidor

```javascript
const port = 3000;
const hostname = '127.0.0.1';
```

- `port`: porta onde o servidor será executado.
- `hostname`: endereço local da aplicação.

## 🚀 Criação do Servidor

```javascript
const server = createServer((req,res)=>{
```

- `req`: objeto com dados da requisição.
- `res`: objeto utilizado para enviar a resposta.

## 🔗 Processamento da URL

```javascript
const url = new URL(req.url, `http://${req.headers.host}`);
```

- `req.url`: caminho da requisição.
- `req.headers.host`: host da requisição.
- `new URL(...)`: cria um objeto URL completo.

## 🔀 Roteamento Principal

```javascript
if(url.pathname === "/task"){
    routeCRUD(req, res);
} else if(url.pathname === "/pesquisa"){
    routeSearch(req, res);
}else{
    res.writeHead(404, {'content-type':'text/plain'});
    res.end("Página não encontrada");
}
```

- `/task`: encaminha para o CRUD.
- `/pesquisa`: encaminha para a busca.
- Caso contrário, retorna erro 404.

## ▶️ Inicialização do Servidor

```javascript
server.listen(port, hostname, ()=>{
    console.log(`Server rodando no http://${hostname}:${port}/`);
});
```

Inicia o servidor e exibe a URL no terminal.

---

# 📘 Documentação — `route/task.routes.js`

## 📌 Descrição

Define o roteamento com base no método HTTP e direciona a requisição para o controller correspondente.

## ⚙️ Dependências

```javascript
import {controllPOST, controllPUT, controllGET, controllSEARCH, controllDELETE} from '../controller/task.controller.js';
```

## 🔀 Função `routeCRUD(req, res)`

Trata as requisições para `/task`.

- `POST` → `controllPOST(req, res)`
- `PUT` → `controllPUT(req, res)`
- `GET` → `controllGET(res)`
- `DELETE` → `controllDELETE(req, res)`

Caso o método não seja suportado, retorna erro 404.

## 🔍 Função `routeSearch(req, res)`

Trata a rota `/pesquisa`.

- `GET` → `controllSEARCH(req, res)`

---

# 📘 Documentação — `controller/task.controller.js`

## 📌 Descrição

Recebe a requisição, extrai parâmetros e corpo, chama os serviços e envia a resposta ao cliente.

## ⚙️ Dependências

```javascript
import {PostService, PutService, GetService, SearchService, DeleteService} from '../service/task.service.js';
```

## 📥 `controllPOST(req, res)`

### Fluxo

1. Inicializa `body = ''`.
2. Acumula os dados recebidos com `req.on('data')`.
3. Finaliza a leitura com `req.on('end')`.
4. Converte o corpo para JSON.
5. Extrai `title`.
6. Chama `PostService(title)`.
7. Retorna a tarefa criada em JSON.

## 📥 `controllPUT(req, res)`

### Fluxo

1. Cria o objeto `URL`.
2. Obtém o parâmetro `id`.
3. Lê o corpo da requisição.
4. Chama `PutService(idRecebido, body)`.
5. Se retornar `-1`, envia erro 404.
6. Caso contrário, retorna o item atualizado.

## 📥 `controllGET(res)`

### Fluxo

1. Chama `GetService()`.
2. Retorna a lista de tarefas.

## 📥 `controllSEARCH(req, res)`

### Fluxo

1. Cria o objeto `URL`.
2. Obtém o parâmetro `id`.
3. Chama `SearchService(idRecebido)`.
4. Se retornar `-1`, envia erro 404.
5. Caso contrário, retorna a tarefa encontrada.

## 📥 `controllDELETE(req, res)`

### Fluxo

1. Cria o objeto `URL`.
2. Obtém o parâmetro `id`.
3. Chama `DeleteService(idRecebido)`.
4. Se retornar `-1`, envia erro 404.
5. Caso contrário, retorna mensagem de sucesso.

---

# 📘 Documentação — `service/task.service.js`

## 📌 Descrição

Contém a lógica de negócio e manipula os dados armazenados em memória.

## 🗂️ Estruturas de Dados

```javascript
let tarefas = [];
let id = 0;
```

- `tarefas`: array com todas as tarefas.
- `id`: contador para geração de identificadores únicos.

## 📥 `PostService(title)`

### Fluxo

1. Cria uma string JSON contendo `id` e `title`.
2. Converte para objeto com `JSON.parse()`.
3. Adiciona ao array `tarefas`.
4. Incrementa `id`.
5. Retorna o objeto em JSON.

## 📥 `PutService(idRecebido, newtitle)`

### Fluxo

1. Localiza o índice com `findIndex()`.
2. Converte `newtitle` para objeto.
3. Se não encontrar, retorna `-1`.
4. Atualiza usando o operador spread (`...`).
5. Retorna o objeto atualizado.

## 📥 `GetService()`

Retorna todas as tarefas com `JSON.stringify(tarefas)`.

## 📥 `SearchService(idRecebido)`

1. Localiza o índice.
2. Se não encontrar, retorna `-1`.
3. Retorna a tarefa encontrada.

## 📥 `DeleteService(idRecebido)`

1. Localiza o índice.
2. Se não encontrar, retorna `-1`.
3. Remove com `splice()`.
4. Retorna `0`.

---

# 🔄 Fluxo Geral da Aplicação

```txt
Cliente (Postman / Front-end)
            ↓
         server.js
            ↓
     route/task.routes.js
            ↓
controller/task.controller.js
            ↓
 service/task.service.js
            ↓
   Array tarefas[] em memória
            ↓
      Resposta HTTP
```

---

# 📌 Conclusão

Este projeto demonstra a construção de uma API backend organizada em camadas utilizando apenas recursos nativos do Node.js.

A separação em `server`, `routes`, `controller` e `service` evidencia claramente a responsabilidade de cada módulo, reproduzindo uma arquitetura profissional amplamente utilizada no desenvolvimento backend.

O projeto consolida conceitos como:

- Criação de servidores HTTP
- Roteamento manual
- Manipulação de streams
- Processamento de JSON
- Arquitetura modular
- CRUD em memória

Essa base é excelente para compreender o funcionamento interno de APIs e preparar a evolução para frameworks como Express e integrações com bancos de dados.
