const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const create = validateRequest({
  //função de validação de criação da ferramenta
  body: z.object({
    //o body deve ser validado. Ele é um objeto
    IAname: z.string({ required_error: "O nome é obrigatório" }), //verifica se o nome é uma string e se ele está presente. Em falha de qualquer um dos casos, retorna um erro
    shortDescription: z.string({
      required_error: "A descrição curta é obrigatória",
    }),
    largeDescription: z.string({ required_error: "A descrição é obrigatória" }),
    imageURL: z.string({ required_error: "A imagem é obrigatória" }),
    link: z.string({ required_error: "O link é obrigatório" }),
    priceType: z.string({ required_error: "A precificação é obrigatória" }),
  }),
});

const destroy = validateRequest({
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O ID não é válido"), //se o id não for válido, ele manda a mensagem.
  }),
});

const update = validateRequest({
  //precisamos validar tanto o body quanto o params, já que recebemos dados dos dois
  body: z.object({
    nome: z.string().optional(), //o .optional() possibilita que o usuário não precise de enviar todas as informações só para editar uma delas
    email: z.string().email("O email é inválido").optional(),
    senha: z.string().optional(),
    cargo: z.string().optional(),
    atividade: z.string().optional(),
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
