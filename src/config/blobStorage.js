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
  }
}

async function uploadImage(image, name) {
  if (imageExists(image)) await deleteImage(image);

  const spacelessName = name.replace(/\s/g, "");
  const blobName = spacelessName + uuidv1();
  const containerClient = getContainer();
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(image, image.length);

  return blockBlobClient?.url;
}

async function editImage(image, previousImage, name) {
  if (imageExists(previousImage)) await deleteImage(previousImage);
  const imageURL = await uploadImage(image, name);

  return imageURL;
}

async function getImage(imageURL) {
  if (imageExists(imageURL)) {
    const name = imageURL?.split("/images/")[1];

    const containerClient = getContainer();
    const blobClient = containerClient.getBlobClient(name);
    const downloadResponse = await blobClient.download();

    const downloaded = await streamToBuffer(downloadResponse.readableStreamBody);
    return downloaded.toString();
  }
  return imageURL;
}

async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

module.exports = {
  uploadImage,
  editImage,
  deleteImage,
  getImage,
};
