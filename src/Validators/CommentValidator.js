const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const create = validateRequest({
  body: z.object({
    comment: z
      .string({ required_error: "The comment is required" })
      .min(2, { message: "The comment is too short" })
      .max(500, { message: "The comment is too long" }),

    id_user: z.custom(
      mongoose.isValidObjectId,
      "The user id is not valid"
    ),
    id_ia: z.custom(
      mongoose.isValidObjectId,
      "The IA id is not valid"
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
    comment: z
    .string()
    .min(2, { message: "The comment is too short" })
    .max(500, { message: "The comment is too long" })
    .optional(),
    id_user: z.custom(
        mongoose.isValidObjectId,
        "The user id is not valid"
    ),
    id_ia: z.custom(
        mongoose.isValidObjectId,
        "The IA id is not valid"
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
