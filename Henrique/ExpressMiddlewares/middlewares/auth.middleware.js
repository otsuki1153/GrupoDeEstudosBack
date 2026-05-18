export default function authMiddleware(req, res, next){
    const token = req.headers.authorization;

    if(!token){
        return res(401).json({
            error:"Não autenticado"
        });
    }

    next();
}