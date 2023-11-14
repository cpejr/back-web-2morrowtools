const bcrypt = require("bcrypt");
const { hash } = require("bcrypt");
const UsuarioModel = require("../Models/UsuarioModel"); //fazer o model de usuario
const {
  deleteFile,
  uploadFile,
  deleteFile,
  sendFile,
  takeFile,
} = require("../config/S3/awsS3");

class UserController { 

    async updateImage(req, res) {
        const { id } = req.params;
        if (!id) return;

        const user = await UserModel.findOne({ _id: id }); //precisa fazer o UserModel
        if (user.avatar_url) {
        const key = user.avatar_url;
        await deleteFile(key);
        }

        const file = req.body.file;
        const { key } = await sendFile({
        file,
        ACL: "public-read	",
        });
        //const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
        user.set({ avatar_url: key }); // O upload file não retorna uma url
        await user.save();

        return res.status(200).json(user);
    }

    async takeImage(req, res) {
        const { id } = req.params;

        const user = await UserModel.findOne({ _id: id });

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
}