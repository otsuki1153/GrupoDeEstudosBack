export default function errorMiddleware(err, req, res,next) {
    console.log(err);
    res.status(500).json({
        error: "Erro interno do servidor"
    });
};