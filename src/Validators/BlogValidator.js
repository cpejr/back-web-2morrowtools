const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const create = validateRequest({
  body: z.object({
    title: z
      .string({ required_error: "The post require a name" })
      .min(2, { message: "Name must be at least 2 characters long" }),
    imageUrl: z.string({ required_error: "The Url is required" }),
    smallDescription: z.string({
      required_error: "The description is required",
    }),
    bigDescription: z.string({ required_error: "The description is required" }),
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
    title: z.string().optional,
    imageUrl: z.string().optional,
    smallDescription: z.string().optional,
    bigDescription: z.string().optional,
  }),
});

module.exports = {
  create,
  destroy,
  update,
};
