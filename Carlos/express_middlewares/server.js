import express from 'express';
import routes from './Modules/Routes/routes.js';
import {RequestLogger} from './Logger.js';
//import dos middlewares: rate-limite, helmet, cors, logger, notFound, error e validation 

const app = express();
const PORT = 3000;

app.use(express.json());

// Tudo abaixo do logger será registrado.
app.use(RequestLogger);

app.use("/tasks", routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na URL http://localhost:${PORT}`);
});
