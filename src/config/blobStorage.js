const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");

function getContainer() {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const containerName = process.env.AZURE_CONTAINER_NAME;

  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  return containerClient;
}

function imageExists(image) {
  return image.includes("2morrowstorage.blob.core.windows.net");
}

async function deleteImage(image) {
  const name = image?.split("/images/")[1];
  if (name) {
    const containerClient = getContainer();
    const blockBlobClient = containerClient.getBlockBlobClient(name);
    await blockBlobClient.delete({
      deleteSnapshots: "include",
    });
    console.log(`Deleted blob ${name}`);
  }
}

async function uploadImage(image, name) {
  if (imageExists(image)) await deleteImage(image);

  const spacelessName = name.replace(/\s/g, "");
  const blobName = spacelessName + uuidv1();
  const containerClient = getContainer();
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(image, image.length);

  console.log(`Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`);
  return blockBlobClient?.url;
}

async function editImage(image, previousImage, name) {
  if (imageExists(previousImage)) await deleteImage(previousImage);
  const imageURL = await uploadImage(image, name);

  console.log(`Blob was uploaded successfully. `);
  return imageURL;
}

module.exports = {
  uploadImage,
  editImage,
  deleteImage,
};
