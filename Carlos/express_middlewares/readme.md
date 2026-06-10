
# Express — Middlewares e boas práticas 

Projeto exemplo que demonstra integração de middlewares, logging e organização de código para APIs. Ideal para apresentar conhecimentos sobre middlewares, observability e separação de camadas.

## O que este exercício ensina

- Como registrar middlewares globais (`RequestLogger`) e aplicar rotas por prefixo.
- Separação clara entre `Routes` / `Controller` / `Service`.
- Onde encaixar bibliotecas de segurança (`helmet`, `cors`) e limits (`express-rate-limit`).

## Endpoints (base `/tasks`) e exemplos

- `GET /tasks` — lista todas as tasks.

```bash
curl -i http://localhost:3000/tasks
```

- `GET /tasks/:id` — buscar por id:

```bash
curl -i http://localhost:3000/tasks/0
```

- `POST /tasks` — criar:

```bash
curl -i -H "Content-Type: application/json" -d '{"title":"Estudar Node"}' http://localhost:3000/tasks
```

- `PUT /tasks/:id` — atualizar:

```bash
curl -i -X PUT -H "Content-Type: application/json" -d '{"title":"Estudar Express","completed":true}' http://localhost:3000/tasks/0
```

- `DELETE /tasks/:id` — deletar:

```bash
curl -i -X DELETE http://localhost:3000/tasks/0
```

## Como executar

```bash
cd express_middlewares
npm install
npm start
```

## Recomendações profissionais

- Adicionar logging estruturado (p.ex. `pino`), variáveis de ambiente com `dotenv`, e testes de integração.
- Em produções, substituir armazenamento em memória por banco de dados e tratar corretamente limites e CORS.
