import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
// import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { validateAsProductEntry } from "../shared/Validator";
import { createRandomId, parseJSON } from "../shared/Utils";

export async function postProducts(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {

  const randomId = createRandomId();
  const item = parseJSON(event.body);
  item.id = randomId;
  validateAsProductEntry(item);

  const result = await ddbClient.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: item
    }));
  console.log(result);

  return {
    statusCode: 201,
    body: JSON.stringify({ id: randomId }),
  };
}
