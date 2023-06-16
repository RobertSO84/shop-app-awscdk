import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { postProducts } from "./PostProducts";
import { getProducts } from "./GetProducts";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { updateProduct } from "./UpdateProduct";
import { deleteProduct } from "./DeleteProduct";
import { JsonError, MissingFieldError } from "../shared/Validator";

const ddbClient = new DynamoDBClient({});

const ddbDocCLient = DynamoDBDocumentClient.from(ddbClient);

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  let message: string;

  try {
    switch (event.httpMethod) {
      case "GET":
        const getResponse = await getProducts(event, ddbClient );
        console.log(getResponse)
        return getResponse;
      case "POST":
        const postResponse = await postProducts(event, ddbDocCLient);
        console.log(postResponse);
        return postResponse;
      case "PUT":
        const putResponse = await updateProduct(event, ddbDocCLient);
        console.log(putResponse);
        return putResponse;
      case "DELETE":
        const deleteResponse = await deleteProduct(event, ddbDocCLient);
        console.log(deleteResponse);
        return deleteResponse;
      default:
        break;
    }
  } catch (error) {
    // console.error(error);
    if(error instanceof MissingFieldError) {
      return {
        statusCode: 400,
        body: error.message
      }
    }
    if(error instanceof JsonError) {
      return {
        statusCode: 400,
        body: error.message
      }
    }
    return {
      statusCode: 500,
      body: error.message,
    };
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message),
  };

  return response;
}

export { handler };
