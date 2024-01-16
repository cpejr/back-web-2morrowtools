const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const {
  setCurrentUserEmail,
  setCurrentUserToken,
} = require("../Utils/globalVariables");

class UserController {
  async create(req, res) {
    try {
      const userFound = await UserModel.findOne({ email: req.body.email });

      if (!userFound) {
        const userFound = await UserModel.create(req.body);

        //const { password, ...userWithoutPassword } = User.toObject()

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

      return res.status(200).json({ token });
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
        return res
          .status(404)
          .json({ message: "Usuário com id " + id + " não encontrado!" });
      const User = await userFound.set(req.body).save();
      res.status(200).json(User);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }
}

module.exports = new UserController();

const { takeFile, sendFile } = require("../config/azureBlobStorage");

class UserController {
  async create(req, res) {
    try {
      const users = await userModel.create(req.body);

      const { senha, ...newUser } = users.toObject();

      return res.status(200).json({ message: "Usuário cadastrado com sucesso!", users });
    } catch (error) {
      res.status(500).json({ message: "Erro!!", error: error.message });
    }
  }

  async read(req, res) {
    const users = await userModel.find();

    return res.status(200).json(users);
  }

  async readById(req, res) {
    const { id } = req.params;

    const user = await userModel.findById(id);

    return res.status(200).json(user);
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

  async update(req, res) {
    const { id } = req.params;

    const user = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json(user);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const user = await userModel.findByIdAndDelete(id);

    return res.status(200).json(user);
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
