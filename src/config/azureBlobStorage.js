const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
//const randomFileName = require("../../utils/general/nomeAleatoriodeArquivo.js");
const randomFileName = require("../utils/general/nomeAleatoriodeArquivo");
require("dotenv").config();

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const sasToken = process.env.AZURE_STORAGE_SAS_TOKEN;
if (!accountName) throw Error("Azure Storage accountName not found");
if (!sasToken) throw Error("Azure Storage accountKey not found");

const blobServiceUri = `https://${accountName}.blob.core.windows.net`;

// https://YOUR-RESOURCE-NAME.blob.core.windows.net?YOUR-SAS-TOKEN   ***VER SE NÃO VAI USAR ISSO. SE NÃO PREICSAR, TIRAR O blobServiceUri***
// const blobServiceClient = new BlobServiceClient(
//   `${blobServiceUri}?${sasToken}`,
//   null
// );

// async function main() { ***NÃO DEVE PRECISAR DESSA FUNÇÃO***
//   const containerName = "2morrowtools";
//   const blobName = "2morrowtools";

//   const timestamp = Date.now();
//   const fileName = `my-new-file-${timestamp}.txt`;

//   // create container client
//   const containerClient = await blobServiceClient.getContainerClient(containerName);

//   // create blob client
//   const blobClient = await containerClient.getBlockBlobClient(blobName);

//   // download file
//   await blobClient.downloadToFile(fileName);

//   console.log(`${fileName} downloaded`);
// }

const sharedKeyCredential = new StorageSharedKeyCredential(
  process.env.AZURE_STORAGE_ACCOUNT_NAME,
  process.env.AZURE_STORAGE_ACCOUNT_KEY
);

const blobServiceClient = new BlobServiceClient(
  `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  sharedKeyCredential
);

async function takeFile(key) {
  const containerClient = blobServiceClient.getContainerClient(
    process.env.AZURE_STORAGE_CONTAINER_NAME
  );
  const blobClient = containerClient.getBlobClient(key);

  const response = await blobClient.download(0);
  const buffer = await streamToBuffer(response.readableStreamBody);

  return buffer;
}

async function sendFile({ file, ACL }) {
  const containerClient = blobServiceClient.getContainerClient(
    process.env.AZURE_STORAGE_CONTAINER_NAME
  );

  const key = randomFileName("") + ".json";
  const blobClient = containerClient.getBlobClient(key);

  const uploadResponse = await blobClient.upload(file, file.length, {
    blobHTTPHeaders: { blobContentType: "application/json" },
    metadata: { key: key },
  });

  return { key, ...uploadResponse._response.parsedBody };
}

async function sendFiles({ files, ACL }) {
  return Promise.all(files.map(async (file) => sendFile({ file, ACL })));
}

async function deleteFile(key) {
  const containerClient = blobServiceClient.getContainerClient(
    process.env.AZURE_STORAGE_CONTAINER_NAME
  );
  const blobClient = containerClient.getBlobClient(key);

  await blobClient.delete();
}

async function deleteFiles(keys) {
  const containerClient = blobServiceClient.getContainerClient(
    process.env.AZURE_STORAGE_CONTAINER_NAME
  );

  await Promise.all(
    keys.map(async (key) => {
      const blobClient = containerClient.getBlobClient(key);
      await blobClient.delete();
    })
  );
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
  takeFile,
  sendFile,
  sendFiles,
  deleteFile,
  deleteFiles,
};
