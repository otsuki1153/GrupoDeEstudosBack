const { on } = require('node:cluster');
const http = require('node:http');
const { parse } = require('node:path');

const user = [];
let id = 1;
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

  const url = new URL(req.url, `http://${req.headers.host}`);

  res.setHeader('Content-Type', 'application/json')


  if (url.pathname === "/Pegar" && req.method == "GET") {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify(user))
  }
  else if (url.pathname === "/Purblicar" && req.method == "POST") {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    })

    req.on('end', () => {
      const NovoUser = JSON.parse(body);
      NovoUser.id = id++;

      user.push(NovoUser);

      res.writeHead(201, { 'content-type': 'application/json' });
      res.end(JSON.stringify(NovoUser));

    })
  }
  else if (url.pathname === "/Editar" && req.method == "PUT") {


    const IdRecebido = parseInt(url.searchParams.get("id"))

    let body = '';

    req.on('data', chunk => {
      body += chunk;
    })

    req.on('end', () => {

      const UserAtualizado = JSON.parse(body);

      const index = user.findIndex(t => t.id === IdRecebido);

      if (index === -1) {

        res.writeHead(404, { 'content-type': 'text/plain' });
        return res.end("User não encontrado");

      }

      user[index] = {
        ...user[index],
        ...UserAtualizado
      };

      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(user[index]));
    })
  }
  else if (url.pathname === "/Deleta" && req.method == "DELETE") {

    const IdRecebido = parseInt(url.searchParams.get("id"));

    const index = user.findIndex(t => t.id === IdRecebido);

    if (index === -1) {

      res.writeHead(404, { 'content-type': 'text/plain' });
      return res.end("User não encontrado");

    }

    user.splice(index, 1);

    res.writeHead(200);
    res.end();
  }


});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})
