function verifyUser(req, res, next){
    const id = req.params.id;

    if(req.userId !== id){
        return res.status(401).json({message: "Operação não autorizada."})
    }

    next();
}

module.exports = verifyUser;