const BlogModel = require("../Models/BlogModel");

class BlogController {
  async create(req, res) {
    try {
      const blog = await BlogModel.create(req.body);
      return res.status(200);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const blog = await BlogModel.read(req.body);
      return res.status(200);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const foundBlogPost = await BlogModel.findbyID(id);
      if (!foundBlogPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      await foundBlogPost.deleteOne();
      res.status(200).json({ message: "Tool deleted sucessfully" });
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const foundBlogPost = await BlogModel.findbyID(id);
      if (!foundBlogPost)
        return res.status(404).json({ message: "Post not found" });
      const Blog = await foundBlogPost.set(req.body).save();
      res.status(200).json(Blog);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }
}

module.exports = new BlogController();
