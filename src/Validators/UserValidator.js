const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const create = validateRequest({
  body: z.object({
    name: z.string({ required_error: "O nome é obrigatório" }), 
    email: z.string({required_error: "O email é obrigatório",}),
    password: z.string({ required_error: "A senha é obrigatória" }),
    imageURL: z.string({ required_error: "A imagem é obrigatória" }),
    type: z.string({ required_error: "O tipo é obrigatório" }),
  }),
});

const destroy = validateRequest({
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O ID não é válido"),
  }),
});

const update = validateRequest({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    imageURL: z.string().optional(),
    type: z.string().optional(),
  }),

  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O ID não é válido"),
  }),
});

module.exports = {
  create,
  destroy,
  update,
};
