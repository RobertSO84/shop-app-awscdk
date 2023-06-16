import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";
// import { UiDeploymentStack } from "./stacks/UiDeploymentStack";

const app = new App();
const dataStack = new DataStack(app, "ShopDataStack");
const lambdaStack = new LambdaStack(app, "ShopLambdaStack", {
  productsTable: dataStack.productsTable,
});
new ApiStack(app, "ShopApiGatewayStack", {
  productsLambdaIntegration: lambdaStack.productsLambdaIntegration,
});
// new UiDeploymentStack(app, "ShopUiDeploymentStack");