const express = require("express");
const { json } = express;
const FavoriteModel = require("../Models/FavoriteModel");
const UserModel = require("../Models/UserModel");


class FavoriteController {
  async create(req, res) {
    try {

    const user = await UserModel.findById(id);

    if(!user || collection.name != "users"){
        return res
            .status(403)
            .json({message: "Id não pertence a um usuário"});
    }
    
        const Favorite = await FavoriteModel.create(req.body);
      await Favorite.save();  
      res.status(200).json(Favorite);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async read(req, res) {
    try {

      const { id } = req.params;
    
      const Favorite = await FavoriteModel.findById(id);
      
      res.status(200).json(Favorite);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const FavoriteFound = await FavoriteModel.findById(id);
      if (!FavoriteFound) {
        return res
          .status(404)
          .json({ message: "Favorito com id " + id + " não encontrado!" });
      }
      await FavoriteFound.deleteOne();
      res
        .status(200)
        .json({
          mensagem: "Favorito com id " + id + " deletado com sucesso!",
        });
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params; 
      const FavoriteFound = await FavoriteModel.findById(id);
      if (!FavoriteFound)
        return res.status(404).json({ message: "Favorito com id " + id + " não encontrado!" });
      const Favorite = await FavoriteFound.set(req.body).save(); 
      res.status(200).json(Favorite); 
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }
}

module.exports = new FavoriteController();