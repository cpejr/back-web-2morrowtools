const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const create = validateRequest({
  body: z.object({
    name: z
      .string({ required_error: "The post require a name" })
      .min(2, { message: "Name must be at least 2 characters long" }),
    imageUrl: z
      .string({ required_error: "A URL da imagem é obrigatória" })
      .min(1, { message: "O URL deve ter pelo menos 1 caractere" }),
    id_categoryfeature: z
      .array(z.custom(mongoose.isValidObjectId, "The category feature ID is not valid"))
      .min(1, "At least one category feature ID is required"),
    id_categoryprofession: z
      .array(z.custom(mongoose.isValidObjectId, "The category profession ID is not valid"))
      .min(1, "At least one category profession ID is required"),
    html: z.string({ required_error: "The page is required" }),
  }),
});

const destroy = validateRequest({
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "The Id is not valid"),
  }),
});

const update = validateRequest({
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "The Id is not valid"),
  }),
  body: z.object({
    name: z.string().optional(),
    imageUrl: z.string().optional(),
    shortDescription: z.string().optional(),
    html: z.string().optional(),
    id_categoryfeatures: z
      .array(z.custom(mongoose.isValidObjectId, "The category feature ID is not valid"))
      .optional(),
    id_categoryprofessions: z
      .array(z.custom(mongoose.isValidObjectId, "The category profession ID is not valid"))
      .optional(),
  }),
});

const postImage = validateRequest({
  body: z.object({
    file: z.string(),
  }),
});

const read = validateRequest({
  body: z.object({
    name: z.string().optional(),
  }),
});

const readImage = validateRequest({
  body: z.object({
    imageUrl: z.string(),
  }),
});

const getAllPosts = validateRequest({
  body: z.object({
    sort: z.object().optional(),
  }),
});

module.exports = {
  create,
  destroy,
  read,
  update,
  readImage,
  getAllPosts,
  postImage,
};
