function verifyIsAdm(req, res, next) {
  if (req?.userType === "Admin") {
    return next();
  }

  return res.status(401).json({
    message: "Operação não autorizada, usuário não é um administrador!",
  });
}

module.exports = verifyIsAdm;
