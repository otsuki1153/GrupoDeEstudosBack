export default function loggerMiddleware(req,res,next) {
    console.log(
        `[${new Date().toISOString()} ${req.method} ${req.originalUrl}]`
    );
    next();
};
