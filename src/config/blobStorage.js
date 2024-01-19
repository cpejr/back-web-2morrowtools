const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");

function getContainer() {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const containerName = process.env.AZURE_CONTAINER_NAME;

  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  return containerClient;
}

async function uploadImage(image, name) {
  const containerClient = getContainer();
  const spacelessName = name.replace(/\s/g, "");
  const blobName = spacelessName + uuidv1();
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(image, image.length);

  console.log(`Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`);
  return blockBlobClient?.url;
}

module.exports = {
  uploadImage,
};
