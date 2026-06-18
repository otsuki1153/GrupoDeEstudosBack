import express from 'express';
import routes from './routes/routes.js';
import { logger } from './middlewares/logger.js';
import { notFound } from './middlewares/notFound.js';

//import dos middlewares:logger, rate-limite, helmet, cors, logger, notFound, error e validation 

const app = express();
const PORT = 3000;

//Com o "express.json(" o express consegue entender o formato JSON, que é o formato utilizado para enviar os dados do corpo da requisição (body) para o servidor. 
// Sem esse middleware, o express não conseguiria interpretar os dados enviados no formato JSON, e o req.body ficaria indefinido.
app.use(express.json());

app.use(logger);

app.use("/games", routes);

app.use(notFound);

app.listen(PORT, () => {
    console.log(`Servidor rodando na URL http://localhost:${PORT}`);
});
