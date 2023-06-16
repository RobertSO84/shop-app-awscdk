import {
    DynamoDBClient,
    GetItemCommand,
    ScanCommand,
  } from "@aws-sdk/client-dynamodb";
  import { unmarshall } from "@aws-sdk/util-dynamodb";
  import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
  
  export async function getProducts(
    event: APIGatewayProxyEvent,
    ddbClient: DynamoDBClient
  ): Promise<APIGatewayProxyResult> {
    if (event.queryStringParameters ) {
      if ("id" in event.queryStringParameters) {
        const productId = event.queryStringParameters["id"];
        const getItemResponse = await ddbClient.send(
          new GetItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
              id: { S: productId },
            },
          })
        );
        if (getItemResponse.Item) {
          const unmarshalledItem = unmarshall(getItemResponse.Item)
          return {
            statusCode: 200,
            body: JSON.stringify(unmarshalledItem),
          };
        } else {
          return {
            statusCode: 404,
            body: JSON.stringify(`Product with id ${productId} not found!`),
          };
        }
      }else {
        return {
          statusCode: 400,
          body: JSON.stringify("Id required!")
        }
      }
  
    } 
  
    const result = await ddbClient.send(
      new ScanCommand({
        TableName: process.env.TABLE_NAME,
      })
    );
    console.log(result.Items);
    const unmarshalledItems = result.Items?.map((item: any) => unmarshall(item));
    console.log(unmarshalledItems);
  
    return {
      statusCode: 201,
      body: JSON.stringify(unmarshalledItems),
    };
  }