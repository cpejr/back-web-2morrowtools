function verifyIsAdm(req, res, next) {
  console.log(req);
  if (req?.userType === "Admin") {
    return next();
  }

  return res.status(401).json({
    message: "Operação não autorizada, usuário não é um administrador!",
  });
}

module.exports = verifyIsAdm;
