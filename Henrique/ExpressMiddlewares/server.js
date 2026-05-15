import express from 'express';
import {rateLimit} from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import TaskRouter from './route/task.routes.js';

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

app.use((req,res,next) =>{
    console.log(
        `[${new Date().toLocaleDateString()} ${req.method} ${req.originalUrl}]`
    );
    next();
});

app.use(helmet());
app.use(cors(corsOp));
app.use(limit);

app.use((req, res,next) =>{
    if(req.method === "GET" || req.method === "DELETE"){
        return next();
    }
    if(!Object.hasOwn(req.body, 'title')){
        return res.status(400).send("Error 400 Bad Request");
    }
    if(typeof req.body.title !== "string"){
        return res.status(400).send("Error 400 Bad Request");
    }
    if(req.body.title.trim() === ""){
        return res.status(400).send("Error 400 Bad Request");
    }
    next();
});

app.use("/tasks", TaskRouter);

app.use((req,res) =>{
    res.status(404).json({
        error:"Rota não encontrada"
    })
});

app.use((err, req, res,next) =>{
    console.log(err);
    res.status(500).json({
        error: "Erro interno do servidor"
    });
});


app.listen(PORT, () =>{
    console.log(`API rodando na porta ${PORT}`)
});

