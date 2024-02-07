const BlogModel = require("../Models/BlogModel");
const { uploadImage, deleteImage, getImage } = require("../config/blobStorage");

class BlogController {
  async create(req, res) {
    try {
      const blog = await BlogModel.create({ ...req.body, imageUrl: "EMPTY" }); //save image url

      const { imageUrl: base64Image, name } = req.body;
      const imageUrl = await uploadImage(base64Image, name);
      blog.set({ imageUrl });
      await blog.save();

      return res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ message: "Error while creating post", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const blogs = await BlogModel.find()
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

      await deleteImage(foundBlogPost.imageUrl);
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

      const { imageUrl } = req.body;
      if (imageUrl) {
        const newImageURL = await uploadImage(imageUrl, foundBlogPost.name, foundBlogPost.imageUrl);
        await foundBlogPost.set({ ...req.body, imageUrl: newImageURL }).save();
      }

      const Blog = await foundBlogPost.set(req.body).save();
      res.status(200).json(Blog);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async readImage(req, res) {
    try {
      const { imageUrl } = req.body;

      const image = await getImage(imageUrl);
      return res.status(200).json({ image });
    } catch (error) {
      return res.status(500).json({ message: "ERROR", error: error.message });
    }
  }
}

module.exports = new BlogController();
