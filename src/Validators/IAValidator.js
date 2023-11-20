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
      .max(60, { message: "Short description cannot exceed 60 characters" }),

    longDescription: z
      .string({ required_error: "The description is required" })
      .min(20, {
        message: "Large description must be at least 20 characters long",
      })
      .max(500, { message: "Large description cannot exceed 500 characters" }),
    linkYoutubeVideo: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters long",
      })
      .optional(),

    linkedIn: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters long",
      })
      .optional(),

    discord: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters long",
      })
      .optional(),

    twitterX: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters long",
      })
      .optional(),

    instagram: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters long",
      })
      .optional(),

    tiktok: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters long",
      })
      .optional(),

    facebook: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters long",
      })
      .optional(),

    reddit: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters long",
      })
      .optional(),

    pinterest: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters long",
      })
      .optional(),

    youtube: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters long",
      })
      .optional(),
    imageURL: z.string({ required_error: "The image URL is required" }),
    link: z.string({ required_error: "The link is required" }),
    priceType: z.string({ required_error: "The price type is required" }),
    id_categoryfeature: z.custom(
      mongoose.isValidObjectId,
      "The category feature ID is not valid"
    ),
    id_categoryprice: z.custom(
      mongoose.isValidObjectId,
      "The category price ID is not valid"
    ),

    id_categoryprofession: z.custom(
      mongoose.isValidObjectId,
      "The category profession ID is not valid"
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
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(60, { message: "Name cannot exceed 60 characters" })
      .optional(),

    shortDescription: z
      .string()
      .min(2, {
        message: "Short description must be at least 2 characters long",
      })
      .max(60, { message: "Short description cannot exceed 60 characters" })
      .optional(),
    longDescription: z
      .string()
      .min(20, {
        message: "Long description must be at least 20 characters long",
      })
      .max(500, { message: "Long description cannot exceed 500 characters" })
      .optional(),
    linkYoutubeVideo: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters long",
      })
      .optional(),

    linkedIn: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters long",
      })
      .optional(),

    discord: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters long",
      })
      .optional(),

    twitterX: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters long",
      })
      .optional(),

    instagram: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters long",
      })
      .optional(),

    tiktok: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters long",
      })
      .optional(),

    facebook: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters long",
      })
      .optional(),

    reddit: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters long",
      })
      .optional(),

    pinterest: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters long",
      })
      .optional(),

    youtube: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters long",
      })
      .optional(),

    imageURL: z.string().optional(),
    link: z.string().optional(),
    priceType: z.string().optional(),
    id_categoryfeature: z.custom(
      mongoose.isValidObjectId,
      "The category feature ID is not valid"
    ),
    id_categoryprice: z.custom(
      mongoose.isValidObjectId,
      "The category price ID is not valid"
    ),
    id_categoryprofession: z.custom(
      mongoose.isValidObjectId,
      "The category profession ID is not valid"
    ),
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
