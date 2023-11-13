import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import { default as mongoose } from "mongoose";

const create = validateRequest({
  body: z.object({
    categoryName: z.string({ required_error: "O nome é obrigatório" }),
  }),
});

const destroy = validateRequest({
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O ID não é válido"),
  }),
});

const update = validateRequest({
  body: z.object({
    nome: z.string().optional(),
  }),

  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O ID não é válido"),
  }),
});

export default {
  create,
  destroy,
  update,
};
