const express = require("express");
const { json } = express;
const FavoriteModel = require("../Models/FavoriteModel");
const UserModel = require("../Models/UserModel");
const IAModel = require("../Models/IAModel");

class FavoriteController {
  async create(req, res) {
    try {
    const { userId, toolId } = req.body;

    const user = await UserModel.findById(userId);
    if(!user || user.collection.collectionName != "users"){
        return res
            .status(403)
            .json({message: "Id não pertence a um usuário"});
    }

    const favoriteFound = await FavoriteModel.find({ userId, toolId });
    if(favoriteFound.length > 0){

      await  FavoriteModel.deleteMany({ userId, toolId });
        return res
            .status(200)
            .json({message: "Favorito removido"});
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

      const { userId } = req.params || null;
    
      if(!userId){
        return res
          .status(404)
          .json({ message: "Usuário com id " + id + " não encontrado!" });
      }
      
      const Favorites = await FavoriteModel.find({ userId });

      const toolIds = Favorites.map(favorite => favorite.toolId)
      let tools = await IAModel.find({
      '_id': { 
        $in: toolIds
        }
      });
      
      res.status(200).json(tools);
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