
# CRUD — Require (http + CommonJS)

Exemplo objetivo mostrando como construir endpoints HTTP sem frameworks. Útil para entender rotas, parsing de body e query params "na unha".

## Endpoints

- `GET /Pegar` — retorna lista de usuários.
- `POST /Publicar` — cria novo usuário (JSON no body).
- `PUT /Editar?id=NUM` — atualiza usuário (JSON no body).
- `DELETE /Deleta?id=NUM` — remove usuário por id.

## Exemplos curl

- Listar:

```bash
curl -i http://127.0.0.1:3000/Pegar
```

- Criar:

```bash
curl -i -H "Content-Type: application/json" -d '{"name":"João","age":30}' http://127.0.0.1:3000/Publicar
```

- Atualizar:

```bash
curl -i -X PUT -H "Content-Type: application/json" -d '{"name":"João Atualizado"}' "http://127.0.0.1:3000/Editar?id=1"
```

- Deletar:

```bash
curl -i -X DELETE "http://127.0.0.1:3000/Deleta?id=1"
```

## Como executar

```bash
cd CRUD/require
npm install
node server_require.js
```

## Observação profissional

Este exemplo é intencionalmente simples; em projetos reais prefira frameworks e padrões que tratem segurança, performance e validação.
