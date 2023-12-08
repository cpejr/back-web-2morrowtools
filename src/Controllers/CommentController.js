const CommentModel = require("../Models/CommentModel");

class CommentController {
  async create(req, res) {
    try {
      const Comment = await CommentModel.create(req.body);

      return res.status(200).json(Comment);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async read(req, res) {
    const comments = await CommentModel.find();

    return res.status(200).json(comments);
  }
  
  async readByUser(req, res) {
    const { id_user } = req.params;

    const comments = await CommentModel.find({
      id_user: id_user,
    }).populate("id_user", "name");

    return res.status(200).json({ comments});
  }
  
  async destroy(req, res) {
    try {
      const { id } = req.params;

      const foundComment = await CommentModel.findById(id);
      if (!foundComment) {
        return res.status(404).json({ message: "Comment not found!" });
      }
      await foundComment.deleteOne();
      res.status(200).json({
        message: "Comment successfully deleted!",
      });
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const foundComment = await CommentModel.findById(id);
      if (!foundComment) return res.status(404).json({ message: "Comment not found!" });
      const Comment = await foundComment.set(req.body).save();
      res.status(200).json(Comment);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }
}

module.exports = new CommentController();
