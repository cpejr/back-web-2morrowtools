const PostModel = require("../Models/PostModel");
const CategoryModel = require("../Models/CategoryFeatureModel.js");
const CategoryProfessionModel = require("../Models/CategoryProfessionModel.js");
const { uploadImage, deleteImage, getImage } = require("../config/blobStorage");

class PostController {
  async create(req, res) {
    try {
      const { id_categoryfeature, id_categoryprofession, ...rest } = req.body;

      const categoryFeatures = await Promise.all(
        id_categoryfeature.map(async (id) => await CategoryModel.findById(id))
      );
      const categoryProfessions = await Promise.all(
        id_categoryprofession.map(async (id) => await CategoryProfessionModel.findById(id))
      );

      if (categoryFeatures.includes(null) || categoryProfessions.includes(null)) {
        return res.status(400).json({ message: "One or more category IDs do not exist" });
      }

      const post = await PostModel.create({
        id_categoryfeatures: id_categoryfeature,
        id_categoryprofessions: id_categoryprofession,
        ...rest,
        imageUrl: "null",
      });

      // Save ImageUrl

      const { imageUrl: base64Image, name } = req.body;
      const imageUrl = await uploadImage(base64Image, name);
      post.set({ imageUrl });
      await post.save();

      return res.status(200).json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error while creating post", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const { name } = req.body;
      let post;

      if (!name) {
        post = await PostModel.find()
          .populate("id_categoryfeatures")
          .populate("id_categoryprofessions");
        return res.status(200).json(post);
      } else {
        post = await PostModel.find({ name: name })
          .populate("id_categoryfeatures")
          .populate("id_categoryprofessions");
        return res.status(200).json(post.at(0));
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts", error: error.message });
    }
  }

  async getAllNames(res) {
    try {
      const titles = await PostModel.find({}, { name: 1 });

      const titlesArray = titles.map((post) => post.name);
      return res.status(200).json(titlesArray);
    } catch (error) {
      res.status(500).json({
        message: "Error while fetching Post names",
        error: error.message,
      });
    }
  }

  async getAllPosts(req, res) {
    try {
      const { filters } = req.query;
      const posts = await PostModel.find()
        .populate("id_categoryfeatures")
        .populate("id_categoryprofessions");

      posts.reverse(); //order by date
      if (filters?.sort === "name") {
        posts.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      }

      return res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({
        message: "Error while fetching Posts",
        error: error.message,
      });
    }
  }

  async findByIDs(req, res) {
    try {
      let idsArray = [];
      const { id } = req.query;
      if (id) {
        idsArray = id.split(",");
      }

      let posts = [];

      if (idsArray.length > 0) {
        const query = {
          $or: [
            { id_categoryfeatures: { $in: idsArray } },
            { id_categoryprofessions: { $in: idsArray } },
          ],
        };
        posts = await PostModel.find(query);
        const populatePromises = posts.map(async (post) => {
          const populatedPost = await PostModel.populate(
            post,
            "id_categoryfeatures id_categoryprofessions"
          );
          return populatedPost;
        });
        posts = await Promise.all(populatePromises);
      }

      return res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error while fetching Posts", error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const foundPost = await PostModel.findById(id);
      if (!foundPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      await deleteImage(foundPost.imageUrl);
      await foundPost.deleteOne();
      res.status(200).json({ message: "Post deleted sucessfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting post", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const foundPost = await PostModel.findById(id);
      if (!foundPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      const { name, imageUrl, shortDescription, id_categoryfeature, id_categoryprofession, html } =
        req.body;

      if (name) {
        await foundPost.set({ name: name }).save();
      }
      if (imageUrl) {
        const newImageURL = await uploadImage(imageUrl, foundPost.name, foundPost.imageUrl);
        await foundPost.set({ imageUrl: newImageURL }).save();
      }

      if (shortDescription) {
        await foundPost.set({ shortDescription: shortDescription }).save();
      }

      if (html) {
        await foundPost.set({ html }).save();
      }

      if (id_categoryfeature.length != 0) {
        await foundPost.set({ id_categoryfeatures: id_categoryfeature }).save();
      }

      if (id_categoryprofession.length != 0) {
        await foundPost.set({ id_categoryprofessions: id_categoryprofession }).save();
      }

      res.status(200).json(foundPost);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Error while updating post", error: error.message });
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

  async postImage(req, res) {
    try {
      const { file } = req.body;
      const imageURL = await uploadImage(file, "postImage");
      return res.status(200).json({ imageURL });
    } catch (error) {
      return res.status(500).json({ message: "ERROR", error: error.message });
    }
  }
}

module.exports = new PostController();
