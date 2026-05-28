
Temas a serem abordados:

Bibliotecas: Helmet,Cors, Rate-limit-express e Dotenv

APIs: logger, notFound e error

## Trilha de estudo:

- Conceito base: Antes de usar qualquer biblioteca é preciso entender que o middleware é apenas uma função que tem acesso a req, res e a próxima função do ciclo
	- Express middleware concept 
	- Request-Response cycle Express 
	- Como usar a função `next()`.
- Variáveis de ambiente (dotenv): É o primeiro passo do código, necessário para aprender a separar as configurações do projeto(porta do servidor, strings de conexão ou chaves secretas) do código fonte.
	- Como usar dotenv no Node.js
	- Environment varibles 12 factor app
- Middlewares customizados (logger,notFound e error): Primeiros passos práticos antes de usar as bibliotecas de terceiros
	- Como criar custom middlewares no Express
	- Express error handling middleware
- Segurança básica (helmet e cors): 
	- O que é CORS HTTP
	- Express Helmet security headers
- Projeção de Tráfego (express-rate-limit): Aprender a proteger a API contra ataques de negação de serviço (DDoS)ou bots fazendo spam, limitando as requisições um mesmo IP pode fazer em um determinado tempo.
	- Rate limiting API express
	- Como prevenir brute force node.js



- **Logger:** Crie um middleware simples que dá um `console.log` em `req.method`, `req.url` e na data atual.
- **Not Found (404):** Crie um middleware no final do seu arquivo de rotas (mas antes do de erro) que responde com status 404 quando nenhuma rota dá match.
- **Error:** Estude a assinatura especial do middleware de erro do Express. **Importante:** Ele obrigatoriamente precisa ter 4 parâmetros `(err, req, res, next)` para o Express reconhecê-lo como um tratador de erros.
- O `cors` resolve o problema de quem pode acessar sua API através de um navegador (Cross-Origin Resource Sharing). 
- O `helmet` é um conjunto de pequenos middlewares que configuram cabeçalhos HTTP (Headers) para proteger seu app contra vulnerabilidades web conhecidas.

### Outras bibliotecas interessantes para adicionar ao seu escopo

Já que você está focado em criar uma API robusta com middlewares, eu recomendo adicionar estas ferramentas ao seu radar:

**1. Zod (ou Joi)** (Fazer)

- **O que é:** Bibliotecas de validação de esquemas e dados.
- **Por que usar:** Em uma API, você nunca deve confiar nos dados que o usuário envia no `req.body`. Você pode criar um middleware que usa o Zod para validar se o e-mail tem formato de e-mail, se a senha tem mais de 6 caracteres, etc. Se a validação falhar, o middleware já retorna um erro 400 (Bad Request) e nem deixa chegar na sua regra de negócio.

**2. Morgan**

- **O que é:** Um middleware de logger HTTP padrão e super completo para Express.
- **Por que usar:** Você mencionou querer fazer o seu próprio `logger`, o que é ótimo para aprendizado. Depois de fazer o seu, substitua-o (ou complemente-o) com o Morgan. Ele extrai automaticamente o tempo de resposta, status code, IP e formata tudo bonitinho no seu console, sendo o padrão da indústria para logs de requisição no Express.

**3. Express-async-errors** (O meu não será assíncronos)

- **O que é:** Um patch para suporte a erros assíncronos.
- **Por que usar:** O Express versão 4 não lida bem nativamente com erros que acontecem dentro de funções `async`. Se ocorrer uma exceção (um `throw`) dentro de uma rota assíncrona, seu servidor pode "crashar" se você não usar um `try/catch`. Essa pequena biblioteca captura esses erros assíncronos e os envia automaticamente para o seu **middleware de erro** customizado.



