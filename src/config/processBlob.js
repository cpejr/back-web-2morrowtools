// Importa os módulos necessários do Azure Functions
const { app, input, output } = require("@azure/functions");
const { v4: uuidv4 } = require("uuid");
const { ApiKeyCredentials } = require("@azure/ms-rest-js");
const {
  ComputerVisionClient,
} = require("@azure/cognitiveservices-computervision");
const sleep = require("util").promisify(setTimeout);

// Definição de constantes para status
const STATUS_SUCCEEDED = "succeeded";
const STATUS_FAILED = "failed";

// Lista de extensões de imagem aceitáveis
const imageExtensions = ["jpg", "jpeg", "png", "bmp", "gif", "tiff"];

// Função para analisar uma imagem usando o serviço Computer Vision
async function analyzeImage(url) {
  try {
    // Obtenção das chaves e endpoint do serviço Computer Vision a partir das variáveis de ambiente
    const computerVision_ResourceKey = process.env.ComputerVisionKey;
    const computerVision_Endpoint = process.env.ComputerVisionEndPoint;

    // Criação de uma instância do cliente Computer Vision
    const computerVisionClient = new ComputerVisionClient(
      new ApiKeyCredentials({
        inHeader: { "Ocp-Apim-Subscription-Key": computerVision_ResourceKey },
      }),
      computerVision_Endpoint
    );

    // Chamada para a análise da imagem
    const contents = await computerVisionClient.analyzeImage(url, {
      visualFeatures: [
        "ImageType",
        "Categories",
        "Tags",
        "Description",
        "Objects",
        "Adult",
        "Faces",
      ],
    });

    return contents;
  } catch (err) {
    console.log(err);
  }
}

// Configuração do gatilho de armazenamento para a função
app.storageBlob("process-blob-image", {
  path: "images/{name}",
  connection: "StorageConnection",
  handler: async (blob, context) => {
    context.log(
      `Storage blob 'process-blob-image' url:${context.triggerMetadata.uri}, size:${blob.length} bytes`
    );

    // Extração do URL do blob e da extensão do arquivo
    const blobUrl = context.triggerMetadata.uri;
    const extension = blobUrl.split(".").pop();

    // Verificação se o URL é vazio ou se a extensão não é uma extensão de imagem válida
    if (!blobUrl) {
      return;
    } else if (
      !extension ||
      !imageExtensions.includes(extension.toLowerCase())
    ) {
      return;
    } else {
      const id = uuidv4().toString();

      const analysis = await analyzeImage(blobUrl);

      // Construção do objeto a ser inserido no banco de dados CosmosDB
      const dataToInsertToDatabase = {
        id,
        type: "image",
        blobUrl,
        blobSize: blob.length,
        ...analysis,
        trigger: context.triggerMetadata,
      };

      return dataToInsertToDatabase;
    }
  },
  // Configuração da saída para o banco de dados CosmosDB
  return: output.cosmosDB({
    connection: "CosmosDBConnection",
    databaseName: "StorageTutorial",
    containerName: "analysis",
  }),
});
