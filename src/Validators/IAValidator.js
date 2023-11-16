const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const create = validateRequest({
  body: z.object({
    name: z.string({ required_error: "The name is required" }),
    shortDescription: z.string({
      required_error: "The short description is required",
    }),
    largeDescription: z.string({
      required_error: "The description is required",
    }),
    imageURL: z.string({ required_error: "The image URL is required" }),
    link: z.string({ required_error: "The link is required" }),
    priceType: z.string({ required_error: "The price type is required" }),
    id_category: z.custom(
      mongoose.isValidObjectId,
      "The category ID is not valid"
    ),
  }),
});

const destroy = validateRequest({
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "The ID is not valid"),
  }),
});

const update = validateRequest({
  body: z.object({
    name: z.string().optional(),
    shortDescription: z.string().optional(),
    largeDescription: z.string().optional(),
    imageURL: z.string().optional(),
    link: z.string().optional(),
    priceType: z.string().optional(),
    id_category: z.custom().optional(),
  }),

  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "The ID is not valid"),
  }),
});

module.exports = {
  create,
  destroy,
  update,
};
