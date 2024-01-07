const { getCurrentUserEmail } = require("../Utils/globalVariables");

function verifyIsAdm(req, res, next) {
  const userEmail = getCurrentUserEmail();
  console.log("Email no middlware", userEmail);

  if (req.userType === "Admin" || userEmail === process.env.USER_ADM_EMAIL) {
    return next();
  }

  return res.status(401).json({
    message: "Operação não autorizada, usuário não é um administrador!",
  });
}

module.exports = verifyIsAdm;
