const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const create = validateRequest({
  body: z.object({
    userId: z.custom(mongoose.isValidObjectId, "Id do usuario é obrigatório" ), 
    toolId: z.custom(mongoose.isValidObjectId, "Id da ferramenta é obrigatório"),
  }),
});

const destroy = validateRequest({
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O ID não é válido"),
  }),
});

const update = validateRequest({
  body: z.object({
    UserId: z.custom(mongoose.isValidObjectId).optional(),
    toolId: z.custom(mongoose.isValidObjectId).optional(),

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