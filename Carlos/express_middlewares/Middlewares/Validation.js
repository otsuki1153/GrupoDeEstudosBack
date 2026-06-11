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

// import {ZodError} from "zod";

// // Esta função reccebe um schema do Zod e retorna um middleware assíncrono para validação de dados
// // Esta função recebe um schema do Zod e retorna um middleware síncrono para validação de dados
// export const ValidateSchema = (schema) => {
//     return async (req, res, next) => {
//     return (req, res, next) => {
//         try {
//             // Faz o "parse" dos dados enviados no corpo da requisição, o Zod valida e remove campos extras que não estavam no schema
//             req.body = await schema.parseAsync(req.body);
//             // Se estiver tudo certo, passa para o Controller ou próximo middleware
//             // O método .parse() executa a validação de forma síncrona.
//             // Ele verifica se req.body corresponde às regras e lança (throw) um erro imediatamente se falhar.
//             // Além disso, ele limpa os dados, removendo propriedades extras não definidas no schema.
//             req.body = schema.parse(req.body);
            
//             // Se a execução chegou até aqui (não deu erro no parse), os dados são válidos.
//             next();
//         }catch (error) {
//             // Se estiver algum erro, captamos o erro do Zod
//         } catch (error) {
//             // Verifica se o erro capturado é uma instância de erro gerada pelo próprio Zod
//             if(error instanceof ZodError){
//                 //Formatamos os erros para um formato mais amigável, onde cada erro tem o campo e a mensagem de erro
//                 // O método .map() é nativo do JavaScript. Ele cria um novo array iterando sobre error.errors do Zod.
//                 // Para cada erro encontrado, retornamos um objeto mais simples e limpo para o front-end.
//                 const FormattedErrors = error.errors.map((err) => ({
//                     // err.path é um array do Zod com as chaves indicando onde o erro ocorreu (ex: ['usuario', 'nome']).
//                     // O método .join('.') une os elementos desse array usando o ponto como separador (ex: 'usuario.nome').
//                     campo: err.path.join('.'),
//                     mensagem: err.message
//                 }));
                
//                 // Retorna um status 400 com uma mensagem de erro e os erros formatados
//                 return res.status(400).json({
//                     message: "Erro de validação",
//                     errors: FormattedErrors
//                 });
//             }

//             //Se for um erro desconhecido, joga para o próximo middleware de tratamento de erros
//             // Se for um erro desconhecido (não foi o Zod que gerou), joga para o tratador de erros padrão do Express
//             next(error);
//         }
//     }
// }

// Explicando os métodos principais:
// schema.parse(): Diferente do parseAsync (que devolve uma Promise), o .parse() executa a validação ali na hora. Funciona como um "filtro rígido": se os dados passarem nas regras do Zod, ele devolve o objeto limpo; se não passarem, o método literalmente "quebra" a execução lançando um Exception (erro). É por isso que o colocamos dentro de um bloco try/catch. Quando ele lança o erro, o código pula o next() e vai direto pro catch (error).

// .map(): Esse é um método fantástico de Arrays no JavaScript. O que ele faz é criar uma "linha de montagem". O Zod devolve um array error.errors lotado de informações complexas que o cliente (front-end) não precisa ver. O .map() passa por cada um desses erros pesados do Zod, joga eles na nossa função de formatação e constrói um novo array contendo apenas a estrutura que definimos ({ campo: ..., mensagem: ... }).

// .join('.'): O Zod nos avisa onde ocorreu o erro usando a propriedade err.path, que é um Array. Por exemplo, se deu um erro na propriedade cep dentro de um objeto endereco, o Zod nos entrega: ['endereco', 'cep']. Para não devolver esse Array solto, o .join('.') entra em ação, "costurando" os itens do Array em uma única string unida por um ponto (ou qualquer caractere que você colocar entre os parênteses). O resultado vira a string legível 'endereco.cep'.

// Isso deixa sua API muito mais rápida e simplificada, perfeita para o escopo desse repositório educativo de vocês!
