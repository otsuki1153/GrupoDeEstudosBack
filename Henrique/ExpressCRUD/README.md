# 📘 Documentação Completa — ExpressCRUD

# 📌 Introdução

O projeto **ExpressCRUD** é uma API REST desenvolvida com url Express [https://expressjs.com/](https://expressjs.com/) sobre a plataforma url Node.js [https://nodejs.org/](https://nodejs.org/), com o objetivo de demonstrar a implementação de um CRUD (*Create, Read, Update, Delete*) de tarefas.

A aplicação segue uma arquitetura em camadas, separando claramente as responsabilidades em quatro módulos principais:

* `server.js` → Inicialização do servidor e configuração global da aplicação.
* `route/task.routes.js` → Definição dos endpoints e associação com os controllers.
* `controller/task.controller.js` → Validação dos dados e coordenação entre requisição e serviço.
* `service/task.service.js` → Lógica de negócio e manipulação dos dados em memória.

Os dados são armazenados em um array em memória, ou seja, não existe persistência em banco de dados. Ao reiniciar a aplicação, todas as tarefas são perdidas.

---

# 🏗️ Arquitetura da Aplicação

```txt
Cliente (Postman / Front-end)
            ↓
        server.js
            ↓
        task.routes.js
            ↓
    task.controller.js
            ↓
      task.service.js
            ↓
     Array tarefas[] em memória
```

---

# 📘 Documentação — `server.js`

## 📌 Descrição

O arquivo `server.js` é o ponto de entrada da aplicação. Ele é responsável por:

* Importar o framework Express.
* Criar a aplicação HTTP.
* Registrar middlewares.
* Associar rotas.
* Inicializar o servidor.

---

## ⚙️ Dependências

```javascript
import express from 'express';
import TaskRouter from './route/task.routes.js'
```

### Descrição

#### `import express from 'express';`

* Importa a função principal do framework Express.
* `express` é a função utilizada para criar uma aplicação web.
* O `import` utiliza a sintaxe de módulos ES Modules.

#### `import TaskRouter from './route/task.routes.js'`

* Importa o roteador definido no arquivo `task.routes.js`.
* Como o módulo foi exportado com `export default`, pode ser importado com qualquer nome.
* Neste projeto, foi escolhido o nome `TaskRouter`.

---

## 🚀 Criação da Aplicação

```javascript
const app = express();
```

### Descrição

* `express()` cria uma instância da aplicação Express.
* Essa instância é armazenada na constante `app`.
* `app` representa o servidor e contém métodos como:

  * `app.use()` → registra middlewares.
  * `app.get()` → define rotas GET.
  * `app.post()` → define rotas POST.
  * `app.listen()` → inicia o servidor.

---

## 🌐 Configuração da Porta

```javascript
const PORT = 3000;
```

### Descrição

* Define a porta em que o servidor será executado.
* A aplicação ficará disponível em:

```txt
http://localhost:3000
```

---

## 🔄 Middleware de Conversão JSON

```javascript
app.use(express.json());
```

### Descrição

Este middleware:

1. Intercepta todas as requisições.
2. Verifica se o `Content-Type` é `application/json`.
3. Converte automaticamente o corpo da requisição em objeto JavaScript.
4. Armazena o resultado em `req.body`.

### Exemplo

#### Requisição recebida

```json
{
  "title": "Estudar Express"
}
```

#### Resultado em `req.body`

```javascript
{ title: 'Estudar Express' }
```

---

## 🔀 Registro das Rotas

```javascript
app.use("/tasks", TaskRouter);
```

### Descrição

* Define um prefixo de rota `/tasks`.
* Todas as rotas do `TaskRouter` serão acessadas a partir desse caminho.

### Exemplos

| Rota no Router | URL Final    |
| -------------- | ------------ |
| `/`            | `/tasks`     |
| `/:id`         | `/tasks/:id` |

---

## ▶️ Inicialização do Servidor

```javascript
app.listen(PORT, () =>{
    console.log(`API rodando na url http://localhost:${PORT}`);
});
```

### Descrição

* `app.listen()` inicia o servidor HTTP.
* Primeiro parâmetro: porta.
* Segundo parâmetro: função callback executada após a inicialização.
* `console.log()` exibe a URL da aplicação.

---

## 🔄 Fluxo de Execução do `server.js`

```txt
Importa Express
        ↓
Cria aplicação com express()
        ↓
Define porta
        ↓
Registra middleware express.json()
        ↓
Registra rotas em /tasks
        ↓
Inicia servidor com app.listen()
```

---

# 📘 Documentação — `route/task.routes.js`

## 📌 Descrição

O arquivo `task.routes.js` define os endpoints da API e associa cada rota ao controller correspondente.

---

## ⚙️ Dependências

```javascript
import {Router} from "express";
import {GetControll, SearchControll, PostControll, PutControll, DeleteControll} from '../controller/task.controller.js'
```

### Descrição

* `Router()` cria um roteador modular.
* As funções importadas representam cada operação do CRUD.

---

## 🛠️ Criação do Roteador

```javascript
const route = Router();
```

### Descrição

* Cria uma instância do roteador.
* `route` passa a possuir métodos como:

  * `route.get()`
  * `route.post()`
  * `route.put()`
  * `route.delete()`

---

## 📄 GET `/`

```javascript
route.get("/", (req,res) =>{
    GetControll(req, res);
});
```

### Descrição

* Define a rota GET `/tasks`.
* Chama `GetControll()`.
* Retorna todas as tarefas.

---

## 📄 GET `/:id`

```javascript
route.get("/:id", (req,res) =>{
    SearchControll(req, res);
});
```

### Descrição

* Define rota dinâmica com parâmetro `id`.
* Exemplo: `/tasks/3`.
* O valor pode ser acessado em `req.params.id`.

---

## 📄 POST `/`

```javascript
route.post("/", (req,res) =>{
    PostControll(req, res);
});
```

### Descrição

* Define a rota para criação de tarefas.
* Recebe dados no corpo da requisição.

---

## 📄 PUT `/:id`

```javascript
route.put("/:id", (req,res) =>{
    PutControll(req, res);
});
```

### Descrição

* Atualiza uma tarefa existente.

---

## 📄 DELETE `/:id`

```javascript
route.delete("/:id", (req,res) =>{
    DeleteControll(req,res);
});
```

### Descrição

* Remove uma tarefa com base no ID.

---

## 📤 Exportação

```javascript
export default route;
```

### Descrição

* Exporta o roteador como exportação padrão.

---

## 🔄 Fluxo de Execução do Router

```txt
Requisição para /tasks
        ↓
Router identifica método e rota
        ↓
Chama controller correspondente
```

---

# 📘 Documentação — `controller/task.controller.js`

## 📌 Descrição

O controller atua como intermediário entre as rotas e os serviços.

Responsabilidades:

* Validar parâmetros e corpo da requisição.
* Chamar a lógica de negócio.
* Construir respostas HTTP.

---

## ⚙️ Dependências

```javascript
import {GetService, PostService, PutService, DeleteService, SearchService} from '../service/task.service.js'
```

---

## 📄 `GetControll(req, res)`

```javascript
export function GetControll(req, res){
    const Objlist = GetService();
    res.json(Objlist);
}
```

### Descrição

1. Chama `GetService()`.
2. Recebe o array de tarefas.
3. Envia a resposta em JSON.

### Variáveis

* `Objlist`: armazena a lista retornada pelo service.

---

## 📄 `SearchControll(req, res)`

```javascript
export function SearchControll(req, res){
    const ParamId = parseInt(req.params.id);
```

### Descrição

* `req.params.id` retorna o parâmetro da rota como string.
* `parseInt()` converte para número inteiro.

```javascript
if (isNaN(ParamId)) {
    return res.status(400).send("ID inválido");
}
```

* `isNaN()` verifica se o valor não é um número.
* Retorna erro 400.

```javascript
const Objlist = SearchService(ParamId);
```

* Busca a tarefa pelo ID.

```javascript
if(Objlist === null){
    return res.status(404).send("Tarefa não encontrada");
} else{
    res.json(Objlist);
}
```

* Se não encontrada, retorna 404.
* Caso contrário, envia a tarefa.

---

## 📄 `PostControll(req, res)`

```javascript
export function PostControll(req,res){
    const JSONtitle = req.body.title;
```

* Obtém o campo `title` do corpo da requisição.

```javascript
if(JSONtitle === null){
    return res.status(400).send("Corpo incompleto");
}
```

* Valida a presença do título.

```javascript
const PostedOBJ = PostService(JSONtitle);
res.status(201).json(PostedOBJ);
```

* Cria a tarefa.
* Retorna status 201 (*Created*).

---

## 📄 `PutControll(req, res)`

* Obtém e valida o ID.
* Lê o corpo com `req.body`.
* Chama `PutService()`.
* Retorna o objeto atualizado ou erro 404.

---

## 📄 `DeleteControll(req, res)`

* Obtém e valida o ID.
* Chama `DeleteService()`.
* Retorna status 204 em caso de sucesso.

---

# 📘 Documentação — `service/task.service.js`

## 📌 Descrição

O arquivo `task.service.js` contém a lógica de negócio e manipulação dos dados em memória.

---

## 🗂️ Estruturas de Dados

```javascript
let tarefas = [];
let NextId = 0;
```

### Descrição

* `tarefas`: array que armazena as tarefas.
* `NextId`: contador utilizado para gerar IDs únicos.

---

## 📄 `GetService()`

```javascript
export function GetService(){
    return tarefas;
}
```

### Descrição

Retorna todas as tarefas armazenadas.

---

## 📄 `SearchService(ParamId)`

* Utiliza `findIndex()` para localizar a posição da tarefa.
* Retorna `null` se não encontrada.
* Retorna o objeto caso exista.

---

## 📄 `PostService(title)`

```javascript
const processedMsg = {
    "id": NextId,
    "title": title
}
```

### Descrição

Cria um objeto com:

* `id`: identificador único.
* `title`: título informado.

Em seguida:

1. Adiciona ao array com `push()`.
2. Incrementa `NextId`.
3. Retorna o objeto criado.

---

## 📄 `PutService(OBJ, ParamId)`

```javascript
tarefas[index] = {
    ...tarefas[index],
    ...OBJ
}
```

### Descrição

* O operador spread (`...`) copia as propriedades do objeto original.
* Em seguida, sobrescreve com os novos valores.

---

## 📄 `DeleteService(ParamId)`

```javascript
tarefas.splice(index, 1);
```

### Descrição

* Remove 1 elemento da posição `index`.
* Retorna `true` em caso de sucesso.

---

# 🌐 Endpoints da API

| Método | Endpoint     | Descrição              |
| -----: | ------------ | ---------------------- |
|    GET | `/tasks`     | Lista todas as tarefas |
|    GET | `/tasks/:id` | Busca tarefa por ID    |
|   POST | `/tasks`     | Cria nova tarefa       |
|    PUT | `/tasks/:id` | Atualiza tarefa        |
| DELETE | `/tasks/:id` | Remove tarefa          |

---

# 🔄 Fluxo Geral do Sistema

```txt
Cliente envia requisição HTTP
            ↓
server.js recebe a requisição
            ↓
Express executa express.json()
            ↓
Router identifica endpoint
            ↓
Controller valida dados
            ↓
Service manipula array tarefas
            ↓
Controller monta resposta
            ↓
Express envia resposta JSON
```

---

# 📌 Conclusão

O projeto **ExpressCRUD** demonstra de forma clara e estruturada como desenvolver uma API REST utilizando Express e Node.js, aplicando uma arquitetura modular baseada em camadas.

A separação entre `server`, `routes`, `controller` e `service` promove organização, reutilização e facilidade de manutenção, além de evidenciar o fluxo completo de uma requisição HTTP.

Ao longo da implementação, são utilizados conceitos fundamentais do desenvolvimento backend, como:

* Middlewares
* Rotas RESTful
* Parâmetros de rota
* Corpo da requisição
* Validação de entrada
* Manipulação de arrays
* Operador spread
* Códigos de status HTTP
* Serialização automática em JSON

Dessa forma, este projeto serve como uma base sólida para compreender o funcionamento interno de APIs e para evoluir futuramente para integrações com bancos de dados, autenticação, testes automatizados e arquiteturas mais avançadas.

