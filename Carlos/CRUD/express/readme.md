# CRUD — Express 

Esta implementação demonstra um padrão comum em APIs Node.js: `routes` delegam a `controllers`, que chamam `services`. É ideal para mostrar entendimento de separação de responsabilidades e preparação para produção.

## Estrutura principal

- `server_express.js` — ponto de entrada (instância Express e montagem de rotas).
- `Modules/routes/routes.js` — define endpoints REST para `/tasks`.
- `Modules/controller/` — lida com entrada/saída e validações simples.
- `Modules/service/` — lógica de negócio e armazenamento em memória (array).

## Endpoints (base `/tasks`)

- `GET /tasks` — lista todas as tasks.
- `GET /tasks/:id` — busca task por id.
- `POST /tasks` — cria nova task (JSON no body, ex.: `{ "title": "Tarefa" }`).
- `PUT /tasks/:id` — atualiza task por id (JSON no body, ex.: `{ "title": "Novo", "completed": true }`).
- `DELETE /tasks/:id` — remove task por id.

## Exemplos curl

- Listar todas:

```bash
curl -i http://localhost:3000/tasks
```

- Buscar por id:

```bash
curl -i http://localhost:3000/tasks/0
```

- Criar (POST):

```bash
curl -i -H "Content-Type: application/json" -d '{"title":"Comprar leite"}' http://localhost:3000/tasks
```

- Atualizar (PUT):

```bash
curl -i -X PUT -H "Content-Type: application/json" -d '{"title":"Comprar pão","completed":true}' http://localhost:3000/tasks/0
```

- Deletar:

```bash
curl -i -X DELETE http://localhost:3000/tasks/0
```

## Como executar

```bash
cd CRUD/express
npm install
npm run start:express
```

## Observação profissional

Este projeto usa armazenamento em memória para fins didáticos. Em um cenário real, substituir por uma camada de persistência (ex.: PostgreSQL, MongoDB) e adicionar testes, logging estruturado e configuração via variáveis de ambiente.
