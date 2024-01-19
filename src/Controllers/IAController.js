const IAModel = require("../Models/IAModel");
const convertStringToRegexp = require("../Utils/ConvertStringtoRegexp.js");
const CategoryPricesModel = require("../Models/CategoryPricesModel.js");
const CategoryProfessionModel = require("../Models/CategoryProfessionModel.js");
const CategoryModel = require("../Models/CategoryFeatureModel.js");
const AvaliationModel = require("../Models/AvaliationModel.js");

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
      res
        .status(500)
        .json({ message: "Error while fetching IA", error: error.message });
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
      const { id, name, type } = req.query;

      if (id) {
        idsArray = id.split(",");
      }

      let tools = [];

      if (idsArray.length === 0) {
        tools = await IAModel.find()
          .populate("id_categoryfeature")
          .populate("id_categoryprice")
          .populate("id_categoryprofession");
      } else {
        tools = await IAModel.find({
          $or: [
            { id_categoryprice: { $in: idsArray } },
            { id_categoryprofession: { $in: idsArray } },
            { id_categoryfeature: { $in: idsArray } },
          ],
        })
          .populate("id_categoryfeature")
          .populate("id_categoryprice")
          .populate("id_categoryprofession");
      }

      if (name) {
        const regexName = new RegExp(name, "i");
        tools = tools.filter((tool) => regexName.test(tool.name));
      }
      switch (type) {
        case "name":
          const OrderedTools = tools.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });

          tools = OrderedTools;

          break;

        case "date":
          const OrderedTime = tools.reverse();
          tools = OrderedTime;
          break;

        case "avaliation":
          const starsTools = await AvaliationModel.find();
          console.log("✌️starsTools --->", starsTools);

          const sums = {};
          const counts = {};

          starsTools.forEach((obj) => {
            const { iaId, rate } = obj;

            if (!sums[iaId]) {
              sums[iaId] = 0;
              counts[iaId] = 0;
            }

            sums[iaId] += rate;
            counts[iaId]++;
          });

          const averages = {};
          Object.keys(sums).forEach((iaId) => {
            averages[iaId] = sums[iaId] / counts[iaId];
          });

          const averagesArray = Object.entries(averages).map(
            ([iaId, rate]) => ({
              iaId: iaId,
              rate: rate,
            })
          );

          averagesArray.sort((a, b) => b.rate - a.rate);

          const OrderedStar = tools.sort((a, b) => {
            const id_a = a._id;
            const id_b = b._id;

            const indexA = averagesArray.findIndex(
              (entry) => entry.iaId == id_a
            );
            const indexB = averagesArray.findIndex(
              (entry) => entry.iaId == id_b
            );
            if (indexA == -1 && indexB == -1) {
              return 0;
            } else if (indexA == -1) {
              return 1;
            } else if (indexB == -1) {
              return -1;
            }
            return indexA - indexB;
          });
          tools = OrderedStar;
          break;
      }
      const uniqueToolObjects = () => {
        const mapIds = new Map();
        const UniqueArray = [];

        tools.forEach((obj) => {
          if (!mapIds.has(obj._id)) {
            mapIds.set(obj._id, true);
            UniqueArray.push(obj);
          }
        });
        return UniqueArray;
      };

      return res.status(200).json(uniqueToolObjects());
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
}

module.exports = new IAController();
