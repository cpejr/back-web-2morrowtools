const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const userFound = await UserModel.findOne({ email }).select("+password");
      if (!userFound) {
        return res.status(403).json({ message: "Email não encontrado" });
      }

      const correctPassword = await bcrypt.compare(
        password,
        userFound.password
      );
      if (!correctPassword) {
        return res.status(403).json({ message: "Senha incorreta" });
      }

      const { password: hashedPassword, ...user } = userFound.toObject();

      const token = jwt.sign(
        {
          user,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE_IN }
      );

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }
}

module.exports = new AuthController();
