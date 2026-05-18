import express from 'express';
import {rateLimit} from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import TaskRouter from './route/task.routes.js';

import error from './middlewares/error.middleware.js';
import logger from './middlewares/logger.middleware.js';
import notFound from './middlewares/notFound.middleware.js';
import validation from './middlewares/validation.middleware.js';

const app = express();
const PORT = 3000;
const corsOp = {
    origin: 'http://localhost:3000'
};
const limit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100
});

app.use(express.json());
app.use(logger);
app.use(helmet());
app.use(cors(corsOp));
app.use(limit);
app.use(validation);


app.use("/tasks", TaskRouter);

app.use(notFound);
app.use(error);

app.listen(PORT, () =>{
    console.log(`API rodando na porta ${PORT}`)
});
