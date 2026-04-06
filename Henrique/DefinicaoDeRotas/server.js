import {createServer} from 'node:http';

// código com finalidade de aprender a definir rotas de url sem necessidade de framework

const port = 3000;
const hostname = '127.0.0.1';

// constante onde será instanciado o servidor
const server = createServer((req, res) =>{

    // instanciação do objeto URL, tendo como parâmetro a URL da requisição e o corpo da URL inteira (IP:PORTA)
    const url = new URL(req.url, `http://${req.headers.host}`);

    // definição de rota para uma "Pagina principal" onde irá aparecer a mensagem de texto "Bem Vindo(a) ao meu site!!" na rota "/"
    
    if(url.pathname === "/" && req.method === "GET"){
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end("Bem Vindo(a) ao meu site!!");
        
    } 

    // definição de uma rota para uma pagina onde irá aparecer outra mensagem "Estou aprendendo Node JS" na rota "/sobre"
    
    else if(url.pathname === "/sobre" && req.method === "GET"){
        res.writeHead(200,  {'content-type': 'text/plain'});
        res.end("Estou aprendendo Node JS")
    } 

    // definição de uma rota para uma pagina onde irá aparecer a informação em formato JSON do nome Henrique, do curso Back End e do status Aprendendo node na rota "/api"
    
    else if(url.pathname === "/api" && req.method === "GET"){
        res.writeHead(200, {'content-type': 'application/json'})
        res.end(JSON.stringify({"nome": "Henrique", "curso": "Back End", "status": "Aprendendo node"}));
    }

    // definição de uma rota para uma pagina que irá mostrar o horário exato onde ele foi acessado (apenas hora:minuto:segundo) na rota "/hora"
    
    else if(url.pathname === "/hora" && req.method === "GET"){
        const agora = new Date();


        res.writeHead(200, {'content-type': 'text/plain'});
        res.end(agora.toLocaleTimeString())
    
    }

    // definição de uma rota para uma pagina que usa parametro na pesquisa para mostrar uma saudação com a palavra escrita na url na rota "/saudacao"
    
    else if(url.pathname === "/saudacao" && req.method === "GET"){
        const name = url.searchParams.get('nome');

        res.writeHead(200, {'content-type': 'text/plain'})
        res.end(`Ola ${name}`);
    }
    

    // definição de uma rota para uma pagina de erro caso a rota seja desconhecida
    else{
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.end("ERRO 404");
    }
});

// método do objeto Server onde quando ele o servidor for aberto ele irá printar no terminal qual a URL para acessar e fazer requisições do servidor
server.listen(port, hostname, ()=>{
    console.log(`Server rodando no http://${hostname}:${port}/`);
});
