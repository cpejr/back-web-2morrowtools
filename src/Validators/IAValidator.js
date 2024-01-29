const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const create = validateRequest({
  body: z.object({
    name: z
      .string({ required_error: "The name is required" })
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(60, { message: "Name cannot exceed 60 characters" }),

    shortDescription: z
      .string({ required_error: "The short description is required" })
      .min(2, {
        message: "Short description must be at least 2 characters long",
      })
      .max(100, { message: "Short description cannot exceed 60 characters" }),

    longDescription: z
      .string({ required_error: "The description is required" })
      .min(20, {
        message: "Large description must be at least 20 characters long",
      })
      .max(750, { message: "Large description cannot exceed 500 characters" }),

    youtubeVideoLink: z.string().min(5).optional(),

    linkedIn: z.string().min(5).optional(),

    discord: z.string().min(5).optional(),

    twitterX: z.string().min(5).optional(),

    instagram: z.string().min(5).optional(),

    tiktok: z.string().min(5).optional(),

    facebook: z.string().min(5).optional(),

    reddit: z.string().min(5).optional(),

    pinterest: z.string().min(5).optional(),

    youtube: z.string().min(5).optional(),

    imageURL: z.string({ required_error: "The image URL is required" }),

    link: z.string({ required_error: "The link is required" }),

    id_categoryfeature: z
      .array(z.custom(mongoose.isValidObjectId, "The category feature ID is not valid"))
      .min(1, "At least one category feature ID is required"),

    id_categoryprice: z
      .array(z.custom(mongoose.isValidObjectId, "The category price ID is not valid"))
      .min(1, "At least one category price ID is required"),

    id_categoryprofession: z
      .array(z.custom(mongoose.isValidObjectId, "The category profession ID is not valid"))
      .min(1, "At least one category profession ID is required"),
  }),
});

const destroy = validateRequest({
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "The ID is not valid"),
  }),
});

const update = validateRequest({
  body: z.object({
    name: z.string().min(2).max(60).optional(),

    shortDescription: z.string().min(2).max(100).optional(),

    longDescription: z.string().min(20).max(750).optional(),

    youtubeVideoLink: z.string().min(5).optional(),

    linkedIn: z.string().min(5).optional(),

    discord: z.string().min(5).optional(),

    twitterX: z.string().min(5).optional(),

    instagram: z.string().min(5).optional(),

    tiktok: z.string().min(5).optional(),

    facebook: z.string().min(5).optional(),

    reddit: z.string().min(5).optional(),

    pinterest: z.string().min(5).optional(),

    youtube: z.string().min(5).optional(),

    imageURL: z.string().optional(),

    link: z.string().optional(),

    id_categoryfeature: z
      .array(z.custom(mongoose.isValidObjectId, "The category feature ID is not valid"))
      .optional(),

    id_categoryprice: z
      .array(z.custom(mongoose.isValidObjectId, "The category price ID is not valid"))
      .optional(),

    id_categoryprofession: z
      .array(z.custom(mongoose.isValidObjectId, "The category profession ID is not valid"))
      .optional(),
  }),

  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "The ID is not valid"),
  }),
});

const readImage = validateRequest({
  body: z.object({
    imageURL: z.string(),
  }),
});

module.exports = {
  create,
  destroy,
  update,
  readImage,
};
