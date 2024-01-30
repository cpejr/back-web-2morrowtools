const BlogModel = require("../Models/BlogModel");

class BlogController {
  async create(req, res) {
    try {
      const blog = await BlogModel.create(req.body);
      return res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ message: "Error while creating post", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const blogs = await BlogModel.find(req.body)
        .populate("id_categoryfeature")
        .populate("id_categoryprofession");
      return res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts", error: error.message });
    }
  }

  async getAllNames(req, res) {
    try {
      const titles = await BlogModel.find({}, { name: 1 });

      const titlesArray = titles.map((post) => post.name);
      return res.status(200).json(titlesArray);
    } catch (error) {
      res.status(500).json({
        message: "Error while fetching Post names",
        error: error.message,
      });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const foundBlogPost = await BlogModel.findById(id);
      if (!foundBlogPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      await foundBlogPost.deleteOne();
      res.status(200).json({ message: "Post deleted sucessfully" });
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const foundBlogPost = await BlogModel.findById(id);
      if (!foundBlogPost) return res.status(404).json({ message: "Post not found" });
      const Blog = await foundBlogPost.set(req.body).save();
      res.status(200).json(Blog);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }
}

module.exports = new BlogController();
