const IAModel = require("../Models/IAModel");

class IAController {
  async create(req, res) {
    try {
      const IA = await IAModel.create(req.body);

      return res.status(200).json(IA);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const { id } = req.params;

      if (id) {
        const foundIA = await IAModel.findById(id);

        if (!foundIA) {
          return res.status(404).json({ message: `ID not found.` });
        }

        return res.status(200).json(foundIA);
      } else {
        const IAs = await IAModel.find(req.body)
          .populate("id_categoryfeature")
          .populate("id_categoryprice")
          .populate("id_categoryprofession");

        return res.status(200).json(IAs);
      }
    } catch (error) {
      res.status(500).json({ message: "Error while fetching IA", error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const foundIA = await IAModel.findById(id);
      if (!foundIA) {
        return res.status(404).json({ message: "Tool not found!" });
      }
      await foundIA.deleteOne();
      res.status(200).json({
        message: "Tool successfully deleted!",
      });
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const foundIA = await IAModel.findById(id);
      if (!foundIA) return res.status(404).json({ message: "Tool not found!" });
      const IA = await foundIA.set(req.body).save();
      res.status(200).json(IA);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }
  async updateIAImage(req, res) {
    const { id } = req.params;
    if (!id) return;

    const foundIA = await IAModel.findOne({ _id: id });
    if (foundIA.avatar_url) {
      const imageKey = foundIA.avatar_url;
      await takeFile(imageKey);
    }

    const file = req.body.file;
    const { key } = await sendFile({
      file,
      ACL: "public-read	",
    });
    foundIA.set({ avatar_url: key }); // O upload file não retorna uma url
    await foundIA.save();

    return res.status(200).json(foundIA);
  }

  async takeIAImage(req, res) {
    const { id } = req.params;

    const foundIA = await IAModel.findOne({ _id: id });

    let result;

    if (!foundIA.avatar_url) result = await takeFile("defaultPfp.json");
    else {
      try {
        result = await takeFile(foundIA.avatar_url);
      } catch (error) {
        result = await takeFile("defaultPfp.json");
      }
    }
    const imagem = JSON.parse(result);

    return res.status(200).json(imagem);
  }
}

module.exports = new IAController();
