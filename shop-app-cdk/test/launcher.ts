import { handler } from "../lib/services/products/handler";

process.env.AWS_REGION = "us-east-2";
process.env.TABLE_NAME = "ProductsStack-06f6f87b6cab";


handler(
  {
    httpMethod: "PUT",
    queryStringParameters: {
      id: "68ae4d38-02f4-474e-9312-92d475e38abb",
    },
    body: JSON.stringify({
        location: "Grecia"
    })
  } as any,
  {} as any
).then(result => console.log(result));
