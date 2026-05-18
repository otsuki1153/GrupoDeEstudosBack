export default function validationMiddleware(req, res,next) {
    if(req.method === "GET" || req.method === "DELETE"){
        return next();
    }
    if(!Object.hasOwn(req.body, 'title')){
        return res.status(400).send("Error 400 Bad Request");
    }
    if(typeof req.body.title !== "string"){
        return res.status(400).send("Error 400 Bad Request");
    }
    if(req.body.title.trim() === ""){
        return res.status(400).send("Error 400 Bad Request");
    }
    next();
};
