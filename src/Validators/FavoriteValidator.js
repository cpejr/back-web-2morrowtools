const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const create = validateRequest({
  body: z.object({
    userId: z.custom(mongoose.isValidObjectId, "Id do usuario é obrigatório"),
    toolId: z.custom(mongoose.isValidObjectId, "Id da ferramenta é obrigatório"),
  }),
});

const destroy = validateRequest({
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O ID não é válido"),
  }),
});

const destroyByIds = validateRequest({
  params: z.object({
    userId: z.custom(mongoose.isValidObjectId, "O ID de usuário não é válido"),
    toolId: z.custom(mongoose.isValidObjectId, "O ID de ferramenta não é válido"),
  }),
});

const read = validateRequest({
  params: z.object({
    userId: z.custom(mongoose.isValidObjectId, "Id do usuario é obrigatório"),
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
  read,
  destroy,
  update,
  destroyByIds,
};
