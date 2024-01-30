const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const create = validateRequest({
  body: z.object({
    name: z
      .string({ required_error: "The post require a name" })
      .min(2, { message: "Name must be at least 2 characters long" }),
    imageUrl: z.string({ required_error: "The Url is required" }),
    shortDescription: z.string({ required_error: "The description is required" }),
    longDescription: z.string({ required_error: "The description is required" }),
    id_categoryfeature: z.string({ required_error: "Invalid ID for Category feature" }),
    id_categoryprofession: z.string({ required_error: "Invalid ID for Category profession" }),
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
    id_categoryfeature: z.string().optional(),
    id_categoryprofession: z.string().optional(),
  }),
});

module.exports = {
  create,
  destroy,
  update,
};
