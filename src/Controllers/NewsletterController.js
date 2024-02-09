const { default: mongoose } = require("mongoose");
const NewsletterModel = require("../Models/NewsletterModel");

class NewsletterController {
  async create(req, res) {
    try {
      const newsletter = await NewsletterModel.create(req.body);
      return res.status(200).json(newsletter);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while trying to create Newsletter", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const newsletter = await NewsletterModel.find(req.body);
      return res.status(200).json(newsletter);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while trying to read Newsletter", error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const foundNewsletter = await NewsletterModel.findById(id);
      if (!foundNewsletter) return res.status(404).json({ message: "Newsletter not found!" });
      await foundNewsletter.deleteOne();
      res.status(200).json({
        message: "Newsletter sucessfully deleted",
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while trying to delete Newsletter", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const foundNewsletter = await NewsletterModel.findById(id);
      if (!foundNewsletter) return res.status(404).json({ message: "Newsletter not found!" });
      const Newsletter = await foundNewsletter.set(req.body).save();
      return res.status(200).json(Newsletter);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error while trying to update Newsletter", error: error.message });
    }
  }
}

module.exports = new NewsletterController();
