
export const errorHandle = (error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ error: "Ocorreu um erro no servidor" });
}
