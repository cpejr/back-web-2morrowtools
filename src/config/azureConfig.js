require("dotenv").config();

const azureConfig = {
  containerRegistry: {
    name: process.env.AZURE_CONTAINER_REGISTRY_NAME,
    username: process.env.AZURE_CONTAINER_REGISTRY_USERNAME,
    password: process.env.AZURE_CONTAINER_REGISTRY_PASSWORD,
  },
};

module.exports = azureConfig;
