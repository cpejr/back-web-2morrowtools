const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const { setCurrentUserEmail, setCurrentUserToken } = require("../Utils/globalVariables");
const { uploadImage } = require("../config/blobStorage");

class UserController {
  async create(req, res) {
    try {
      let userFound = await UserModel.findOne({ email: req.body.email });

      if (!userFound) {
        userFound = await UserModel.create({ ...req.body, imageURL: "" });
        const { imageURL: base64Image, name } = req.body;

        const imageURL = await uploadImage(base64Image, name);
        userFound.set({ imageURL });
        await userFound.save();
      }

      const token = jwt.sign(
        {
          userFound,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE_IN }
      );

      setCurrentUserEmail(req.body.email);
      setCurrentUserToken(token);

      return res.status(200).json({ token, user: userFound });
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
        return res.status(404).json({ message: "Usuário com id " + id + " não encontrado!" });
      }
      await userFound.deleteOne();
      res.status(200).json({
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

  async updateImage(req, res) {
    const { id } = req.params;
    if (!id) return;

    const user = await userModel.findOne({ _id: id });
    if (user.avatar_url) {
      const imageKey = user.avatar_url;
      await takeFile(imageKey);
    }

    const file = req.body.file;
    const { key } = await sendFile({
      file,
      ACL: "public-read	",
    });
    user.set({ avatar_url: key }); // O upload file não retorna uma url
    await user.save();

    return res.status(200).json(user);
  }

  async takeImage(req, res) {
    const { id } = req.params;

    const user = await userModel.findOne({ _id: id });

    let result;

    if (!user.avatar_url) result = await takeFile("defaultPfp.json");
    else {
      try {
        result = await takeFile(user.avatar_url);
      } catch (error) {
        result = await takeFile("defaultPfp.json");
      }
    }
    const imagem = JSON.parse(result);

    return res.status(200).json(imagem);
  }

  async main() {
    const containerName = "2morrowtools";
    const blobName = "2morrowtools";

    const timestamp = Date.now();
    const fileName = `my-new-file-${timestamp}.txt`;

    // create container client
    const containerClient = await blobServiceClient.getContainerClient(containerName);

    // create blob client
    const blobClient = await containerClient.getBlockBlobClient(blobName);

    // download file
    await blobClient.downloadToFile(fileName);

    console.log(`${fileName} downloaded`);
  }
}

module.exports = new UserController();
