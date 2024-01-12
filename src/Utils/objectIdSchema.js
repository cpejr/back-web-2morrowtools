const { z } = require("zod");
const { default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Types;

const objectIdSchema = (fieldName) => {
  z.custom(
    (data) => ObjectId.isValid(data),
    `${fieldName} field is not a valid Object ID`
  );
};

module.exports = objectIdSchema;
