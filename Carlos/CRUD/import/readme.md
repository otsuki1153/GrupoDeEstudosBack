
# CRUD — Import (módulos ES + http)

Esta implementação explora os módulos ES e o uso do servidor HTTP nativo para que você entenda o que o Express abstrai. É ótima para aprender como manipular `req`/`res` manualmente e praticar parsing de body/URL.

## Ponto de entrada

- `server_import.js` — cria o servidor e encaminha requisições para `Modules/routes/chat_routes.js` quando a rota `/message` é usada.

## Rotas e comportamento

- `POST /message` — cria mensagem; enviar JSON `{ "text": "..." }` no body.
- `GET /message?id=NUM` — obtém mensagem por id; sem `id` retorna todas.
- `PUT /message?id=NUM` — atualiza mensagem (body JSON `{ "text": "..." }`).
- `DELETE /message?id=NUM` — remove mensagem por id.

## Exemplos curl

- Criar (POST):

```bash
curl -i -H "Content-Type: application/json" -d '{"text":"Olá grupo"}' http://127.0.0.1:3000/message
```

- Listar todas:

```bash
curl -i http://127.0.0.1:3000/message
```

- Buscar por id:

```bash
curl -i "http://127.0.0.1:3000/message?id=1"
```

- Atualizar (PUT):

```bash
curl -i -X PUT -H "Content-Type: application/json" -d '{"text":"Mensagem atualizada"}' "http://127.0.0.1:3000/message?id=1"
```

- Deletar:

```bash
curl -i -X DELETE "http://127.0.0.1:3000/message?id=1"
```

## Como executar

```bash
cd CRUD/import
npm install
node server_import.js
```

## Observação didática

Trabalhar neste nível mostra como lidar com parsing de streaming, tratamento de erros e contratos HTTP. Para produção, considere Express/Koa e validação de input.
