import {ZodError} from "zod";

// Esta função reccebe um schema do Zod e retorna um middleware assíncrono para validação de dados
export const ValidateSchema = (schema) => {
    return async (req, res, next) => {
        try {
            // Faz o "parse" dos dados enviados no corpo da requisição, o Zod valida e remove campos extras que não estavam no schema
            req.body = await schema.parseAsync(req.body);
            // Se estiver tudo certo, passa para o Controller ou próximo middleware
            next();
        }catch (error) {
            // Se estiver algum erro, captamos o erro do Zod
            if(error instanceof ZodError){
                //Formatamos os erros para um formato mais amigável, onde cada erro tem o campo e a mensagem de erro
                const FormattedErrors = error.errors.map((err) => ({
                    campo: err.path.join('.'),
                    mensagem: err.message
                }));
                
                // Retorna um status 400 com uma mensagem de erro e os erros formatados
                return res.status(400).json({
                    message: "Erro de validação",
                    errors: FormattedErrors
                });
            }

            //Se for um erro desconhecido, joga para o próximo middleware de tratamento de erros
            next(error);
        }
    }

}