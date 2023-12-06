const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const create = validateRequest({
  body: z.object({
    userId: z.custom(mongoose.isValidObjectId, "User ID is required" ),
    iaId: z.custom(mongoose.isValidObjectId, "IA ID is required" ),
    rate: z
    .number({ required_error: "Avaliation rate is required" })
    .min(1, {
      message: "Avaliation rate must be at least 1",
    })
    .max(5, { message: "Avaliation rate must not exceed 5" })
  }),
});

const destroy = validateRequest({
  params: z.object({
    Id: z.custom(mongoose.isValidObjectId, "IA ID is required" ),
  }),
});

const update = validateRequest({
    body: z.object({
        userId: z.custom(mongoose.isValidObjectId, "User ID is required" ),
        iaId: z.custom(mongoose.isValidObjectId, "IA ID is required" ),
        rate: z
        .number({ required_error: "Avaliation rate is required" })
        .min(1, {
          message: "Avaliation rate must be at least 1",
        })
        .max(5, { message: "Avaliation rate must not exceed 5" })
      }),
});

module.exports = {
  create,
  destroy,
  update,
};
