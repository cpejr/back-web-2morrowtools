const userModel = require("../Models/UserModel");

const { takeFile, sendFile } = require("../config/azureBlobStorage");

class UserController {
  async readById(req, res) {
    const { id } = req.params;

    const usuario = await userModel.findById(id);

    return res.status(200).json(usuario);
  }

  async updateImage(req, res) {
    const { id } = req.params;
    if (!id) return;

    const usuario = await userModel.findOne({ _id: id });
    if (usuario.avatar_url) {
      const chave = usuario.avatar_url;
      await takeFile(chave);
    }

    const file = req.body.file;
    const { key } = await sendFile({
      file,
      ACL: "public-read	",
    });
    usuario.set({ avatar_url: key }); // O upload file não retorna uma url
    await usuario.save();

    return res.status(200).json(usuario);
  }

  async takeImage(req, res) {
    const { id } = req.params;

    const usuario = await userModel.findOne({ _id: id });

    let resultado;

    if (!usuario.avatar_url) resultado = await takeFile("defaultPfp.json");
    else {
      try {
        resultado = await takeFile(usuario.avatar_url);
      } catch (error) {
        resultado = await takeFile("defaultPfp.json");
      }
    }
    const imagem = JSON.parse(resultado);

    return res.status(200).json(imagem);
  }

  async main() {
    const containerName = "2morrowtools";
    const blobName = "REPLACE-WITH-EXISTING-BLOB-NAME";

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
