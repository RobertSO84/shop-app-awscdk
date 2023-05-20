
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiGatewayConstruct } from './stacks/gateway/ApiGatewayConstruct';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ShopAppCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Persistance (DynamoDB)

    // Gateway (API Gateway + Lambda)
    const gateway = new ApiGatewayConstruct(this, 'gateway')
  }
}
