
# CRUD - Visão geral

Este diretório contém três implementações didáticas que mostram abordagens diferentes para construir um CRUD em Node.js. O objetivo é servir como material de estudo para integrantes do grupo e como demonstração técnica: código claro, modular e comentado.

- `require/` — implementação com o módulo `http` e sintaxe CommonJS (baixo nível).
- `import/` — implementação com módulos ES (`import`) usando o módulo nativo `http` (controle manual de parsing).
- `express/` — implementação usando `express` com rotas, controller/service separados (padrão industrial).

Cada subpasta contém código comentado e um `package.json` quando aplicável. Abaixo seguem instruções rápidas e exemplos de requisições para começar a testar localmente.

## Como executar

Abra um terminal e entre na subpasta desejada, instale dependências (quando houver) e inicie o servidor:

```bash
cd CRUD/require
npm install
node server_require.js

cd ../import
npm install
node server_import.js

cd ../express
npm install
npm run start:express
```

## Boas práticas

- Separação de responsabilidades (routes / controllers / services).
- Uso de módulos ES vs CommonJS para comparar estilos e compatibilidade.
- Tratamento básico de erros e validações simples nos controllers.

## Próximos passos recomendados

- Adicionar testes unitários para `service`.
- Integrar validação com `zod` ou `joi` nos controllers.
- Persistência em banco (ex.: SQLite/JSON/Memory -> substituir arrays in-memory).

