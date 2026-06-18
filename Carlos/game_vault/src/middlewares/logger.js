
export const logger = (req, res, next) => {

    console.log (` Metodo utilizado: ${req.method} - URL: ${req.url}`);

    next();
}