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
    const { id_ia } = req.params;
    const comments = await CommentModel.find({ id_ia });
    return res.status(200).json(comments);
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const { user } = req.body;
      console.log(user);
      console.log(user._id);
      console.log(user.type);
      const foundComment = await CommentModel.findById(id);
      if (!foundComment) {
        return res.status(404).json({ message: "Comment not found!" });
      }
      if (
        user._id !== foundComment.id_user.toString() &&
        user.type !== "Admin"
      ) {
        return res
          .status(401)
          .json({ message: "You are not authorized to delete this comment" });
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
      if (!foundComment)
        return res.status(404).json({ message: "Comment not found!" });
      if (
        req.body.id_user_makingChange !== foundComment.id_user.toString() &&
        req.body.type_user_makingChange !== "Admin"
      ) {
        return res
          .status(401)
          .json({ message: "You are not authorized to change this comment" });
      }
      const Comment = await foundComment.set(req.body).save();
      res.status(200).json(Comment);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }
}

module.exports = new CommentController();
