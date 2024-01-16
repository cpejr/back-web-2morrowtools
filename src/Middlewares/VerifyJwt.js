const jwt = require("jsonwebtoken");
const { getCurrentUserToken } = require("../Utils/globalVariables");

function verifyJwt(req, res, next) {
  const currentToken = getCurrentUserToken(); // Login with google --> Firebase
  const authHeader =
    req.headers.authorization || req.headers.Authorization || currentToken;
  if (!authHeader) {
    return res
      .status(403)
      .json({ message: "Header de autorização não encontrado" });
  }
  const [bearer, token] = authHeader.split(" ");

  if (!/^Bearer$/.test(bearer)) {
    return res
      .status(403)
      .json({ message: "Header de autorização mal formatado" });
  }

  if (!token) {
    return res.status(403).json({ message: "Jwt token não encontrado" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Jwt token é inválido" });
    }

    req.userId = user.user._id;
    req.userType = user.user.type;

    next();
  });
}

module.exports = verifyJwt;
