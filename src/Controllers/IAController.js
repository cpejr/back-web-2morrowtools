const IAModel = require("../Models/IAModel");
const convertStringToRegexp = require("../Utils/ConvertStringtoRegexp.js");
const CategoryPricesModel = require("../Models/CategoryPricesModel.js");
const CategoryProfessionModel = require("../Models/CategoryProfessionModel.js");
const CategoryModel = require("../Models/CategoryFeatureModel.js");

class IAController {
  async create(req, res) {
    try {
      const IA = await IAModel.create(req.body);
      if (!IA.youtubeVideoLink.includes("/embed")) {
        IA.youtubeVideoLink = IA.youtubeVideoLink.replace("watch?v=", "embed/");
        await IA.save();
      }
      return res.status(200).json(IA);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while createing an AI", error: error.message });
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

  async getAllNames(req, res) {
    try {
      const names = await IAModel.find({}, { name: 1 });

      const namesArray = names.map((ia) => ia.name);
      return res.status(200).json(namesArray);
    } catch (error) {
      res.status(500).json({
        message: "Error while fetching IA names",
        error: error.message,
      });
    }
  }

  async readByName(req, res) {
    try {
      const name = req.query?.name;
      const regexName = new RegExp(name, "i");
      const AIs = await IAModel.find({ name: regexName })
        .sort("name")
        .populate("id_categoryfeature")
        .populate("id_categoryprice")
        .populate("id_categoryprofession");

      return res.status(200).json(AIs);
    } catch (error) {
      return res.status(500).json({
        message: "Error while fetching AI by name",
        error: error.message,
      });
    }
  }

  async filterCategories(req, res) {
    try {
      let idsArray = [];
      const { id, name } = req.query;

      if (id) {
        idsArray = id.split(",");
      }

      let tools = [];

      if (idsArray.length === 0) {
        tools = await IAModel.find();
      } else {
        tools = await IAModel.find({
          $or: [
            { id_categoryprice: { $in: idsArray } },
            { id_categoryprofession: { $in: idsArray } },
            { id_categoryfeature: { $in: idsArray } },
          ],
        });
      }

      if (name) {
        const regexName = new RegExp(name, "i");
        tools = tools.filter((tool) => regexName.test(tool.name));
      }

      const uniqueTools = Array.from(new Set(tools.map((tool) => tool.id)));

      const uniqueToolObjects = await IAModel.find({
        _id: { $in: uniqueTools },
      })
        .populate("id_categoryfeature")
        .populate("id_categoryprice")
        .populate("id_categoryprofession");

      return res.status(200).json(uniqueToolObjects);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
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
