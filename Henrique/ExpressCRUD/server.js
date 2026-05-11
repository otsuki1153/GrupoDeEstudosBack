import express from 'express';
import TaskRouter from './route/task.routes.js'

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/tasks", TaskRouter);

app.listen(PORT, () =>{
    console.log(`API rodando na url http://localhost:${PORT}`);
});
