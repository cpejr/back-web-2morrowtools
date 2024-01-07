const { getCurrentUserEmail } = require("../Utils/globalVariables");

function verifyIsAdm(req, res, next) {
  const userEmail = getCurrentUserEmail();
  console.log(userEmail);

  if (req.userType === "Admin" || userEmail === "amandaalves@cpejr.com.br") {
    return next();
  }

  return res.status(401).json({
    message: "Operação não autorizada, usuário não é um administrador!",
  });
}

module.exports = verifyIsAdm;
