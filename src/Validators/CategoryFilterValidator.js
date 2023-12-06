const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const create = validateRequest({
  body: z.object({
    name: z
      .string({ required_error: "O nome é obrigatório" })
      .min(2, {
        message: "O nome deve ter pelo menos 2 caracteres",
      })
      .max(60, {
        message: "O nome não pode exceder 60 caracteres",
      }),
  }),
});

module.exports = {
  create,
};
