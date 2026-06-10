import { Router } from "express";
import { z } from "zod";
import { ValidateSchema } from "../../Middlewares/Validation.js";
import { GetControll, SearchControll, PostControll, PutControll, DeleteControll } from "../Controller/task.controller.js";

let router = Router();

const CreateTaskSchema = z.object({
    title: z.string({ required_error: "O título é obrigatório" }).min(3, { message: "O título deve ter pelo menos 3 caracteres" }),
    description: z.string().optional(),
    completed: z.boolean().optional()
});

// Chama o método get do router para a rota raiz ("/") e associa o GetControll para lidar com as requisições GET
router.get("/", GetControll);

// Chama o método get do router para a rota "/:id" e associa o SearchControll para lidar com as requisições GET que incluem um ID como parâmetro
router.get("/:id", SearchControll);

// Chama o método post do router para a rota raiz ("/") e associa o PostControll para lidar com as requisições POST.
// Além de usar o middleware de validação ValidateSchema para validar os dados enviados no corpo da requisição com base no CreateTaskSchema definido anteriormente
router.post("/", ValidateSchema(CreateTaskSchema), PostControll);

// Chama o método put do router para a rota "/:id" e associa o PutControll para lidar com as requisições PUT que incluem um ID como parâmetro.
// Também usa o middleware de validação ValidateSchema para validar os dados enviados no corpo da requisição com base no CreateTaskSchema definido anteriormente
router.put("/:id", ValidateSchema(CreateTaskSchema), PutControll);

router.delete("/:id", DeleteControll);

export default router;