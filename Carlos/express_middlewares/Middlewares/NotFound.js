export const notFound = (req, res, next) => {

    //Definimos os status da resposta como 404 e enviamos uma mensagem em formato JSON indicando que a rota não foi encontrada.
    res.status(404).json({ message: "Rota não encontrada" });

}