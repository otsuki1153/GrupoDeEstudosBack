
const http = require('node:http');

const users = [];
let id = 1;
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

  const url = new URL(req.url, `http://${req.headers.host}`);

  res.setHeader('Content-Type', 'application/json')


  if (url.pathname === "/Pegar" && req.method == "GET") {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify(users))
  }
  else if (url.pathname === "/Publicar" && req.method == "POST") {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    })

    req.on('end', () => {
      const NovoUser = JSON.parse(body);
      NovoUser.id = id++;

      users.push(NovoUser);

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

      const index = users.findIndex(t => t.id === IdRecebido);

      if (index === -1) {

        res.writeHead(404, { 'content-type': 'text/plain' });
        return res.end("User não encontrado");

      }

      users[index] = {
        ...users[index],
        ...UserAtualizado
      };

      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(users[index]));
    })
  }
  else if (url.pathname === "/Deleta" && req.method == "DELETE") {

    const IdRecebido = parseInt(url.searchParams.get("id"));

    const index = users.findIndex(t => t.id === IdRecebido);

    if (index === -1) {

      res.writeHead(404, { 'content-type': 'text/plain' });
      return res.end("User não encontrado");

    }

    users.splice(index, 1);

    res.writeHead(200);
    res.end();
  }


});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})
