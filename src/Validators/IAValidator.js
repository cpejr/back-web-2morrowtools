import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import { default as mongoose } from "mongoose";

const create = validateRequest({
  body: z.object({
    IAname: z.string({ required_error: "O nome é obrigatório" }), 
    shortDescription: ({required_error: "A descrição curta é obrigatória",}),
    largeDescription: z.string({ required_error: "A descrição é obrigatória" }),
    imageURL: z.string({ required_error: "A imagem é obrigatória" }),
    link: z.string({ required_error: "O link é obrigatório" }),
    priceType: z.string({ required_error: "A precificação é obrigatória" }),
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
    senha: z.string().optional(),
    cargo: z.string().optional(),
    atividade: z.string().optional(),
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
