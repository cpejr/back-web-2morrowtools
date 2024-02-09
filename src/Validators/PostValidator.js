const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const create = validateRequest({
  body: z.object({
    name: z
      .string({ required_error: "The post require a name" })
      .min(2, { message: "Name must be at least 2 characters long" }),
    imageUrl: 
      z.string({ required_error: "A URL da imagem é obrigatória" })
      .min(1, { message: "O URL deve ter pelo menos 1 caractere" }),
    shortDescription: z
      .string({ required_error: "The short description is required" })
      .min(2, {
        message: "Short description must be at least 2 characters long",
      })
      .max(100, { message: "Short description must not exceed 60 characters" }),

    longDescription: z
      .string({ required_error: "The large description is required" })
      .min(20, {
        message: "Large description must be at least 20 characters long",
      })
      .max(750, { message: "Large description must not exceed 500 characters" }),
    id_categoryfeature: z
      .array(z.custom(mongoose.isValidObjectId, "The category feature ID is not valid"))
      .min(1, "At least one category feature ID is required"),
    id_categoryprofession: z
      .array(z.custom(mongoose.isValidObjectId, "The category profession ID is not valid"))
      .min(1, "At least one category profession ID is required"),
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
    longDescription: z.string().optional(),
    id_categoryfeatures: z  
      .array(z.custom(mongoose.isValidObjectId, "The category feature ID is not valid"))
      .optional(),
    id_categoryprofessions: z
      .array(z.custom(mongoose.isValidObjectId, "The category profession ID is not valid"))
      .optional(),
  }),
});

const readImage = validateRequest({
  body: z.object({
    imageUrl: z.string(),
  }),
});

module.exports = {
  create,
  destroy,
  update,
  readImage,
};
