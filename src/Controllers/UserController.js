const express = require("express");
const { json } = express;
const UserModel = require("../Models/UserModel");

class UserController {
  async create(req, res) {
    try {
      const User = await UserModel.create(req.body);

      const { password, ...userWithoutPassword } = User.toObject()
      
      await User.save();  
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async read(req, res) {
    try {

      const { id } = req.params;
    
      const User = await UserModel.findById(id);
      
      res.status(200).json(User);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const userFound = await UserModel.findById(id);
      if (!userFound) {
        return res
          .status(404)
          .json({ message: "Usuário com id " + id + " não encontrado!" });
      }
      await userFound.deleteOne();
      res
        .status(200)
        .json({
          mensagem: "Usuário com id " + id + " deletado com sucesso!",
        });
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params; 
      const userFound = await UserModel.findById(id);
      if (!userFound)
        return res.status(404).json({ message: "Usuário com id " + id + " não encontrado!" });
      const User = await userFound.set(req.body).save(); 
      res.status(200).json(User); 
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }
}

module.exports = new UserController();