import {
    DeleteItemCommand,
    DynamoDBClient
  } from "@aws-sdk/client-dynamodb";
  import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
  
  export async function deleteProduct(
    event: APIGatewayProxyEvent,
    ddbClient: DynamoDBClient
  ): Promise<APIGatewayProxyResult> {
    if (event.queryStringParameters && ('id' in event.queryStringParameters)) {
  
      const productId = event.queryStringParameters['id'];
  
      const deleteResult = await ddbClient.send(new DeleteItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          'id': {S: productId}
        }
      }));
      console.log(deleteResult);

      return {
        statusCode: 200,
        body: JSON.stringify(`Deleted product with id ${productId}`),
      };
    }
  
    return {
      statusCode: 400,
      body: JSON.stringify('Please provide de right delete arguments'),
    };
  }
  