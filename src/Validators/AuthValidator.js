const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const login = validateRequest({
    body: z.object({
        email: z.string({required_error: "O email é obrigatório",}),
        password: z.string({ required_error: "A senha é obrigatória" }),
    })
});

module.exports = {
    login
}