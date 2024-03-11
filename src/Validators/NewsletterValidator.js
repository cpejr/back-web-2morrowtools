const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const create = validateRequest({
  body: z.object({
    name: z
      .string({ required_error: "The name is required" })
      .min(2, {
        message: "Name must be at least 2 characters long",
      })
      .max(60, {
        message: "Name cannot exceed 60 characters",
      }),
    email: z
      .string({ required_error: "The email is required" })
      .email({ message: "Invalid email" }),
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
      .min(2, {
        message: "Name must be at least 2 characters long",
      })
      .max(60, {
        message: "Name cannot exceed 60 characters",
      }),
    email: z
      .string({ required_error: "The email is required" })
      .email({ message: "Invalid email" }),
    message: z
      .string()
      .min(1, {
        message: "Message must not be empty",
      })
      .max(500, {
        message: "Message cannot exceed 500 characters",
      })
      .optional(),
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
