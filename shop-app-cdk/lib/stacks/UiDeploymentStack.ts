import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from 'constructs';
import { getSuffixFromStack } from "../utils/Utils";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { existsSync } from "fs";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Distribution, OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
import { join } from "path";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";


export class UiDeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const suffix = getSuffixFromStack(this);

    const deploymentBucket = new Bucket(this, 'uiDeploymentBucket', {
        bucketName: `shop-app-frontend-${suffix}`
    });

    const uiDir = join(__dirname, '..', '..', '..', 'shop-app-frontend', 'dist' );
    if (!existsSync(uiDir)) {
        console.warn("UI dir not found" + uiDir)
    }

    new BucketDeployment(this, 'ShopAppDeployment', {
        destinationBucket: deploymentBucket,
        sources: [Source.asset(uiDir)]
    })

    const originIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');
    deploymentBucket.grantReadWrite(originIdentity);

    const distribution = new Distribution(this, 'ShopAppDistribution', {
        defaultRootObject: 'index.html',
        defaultBehavior: {
            origin: new S3Origin(deploymentBucket, {
                originAccessIdentity: originIdentity
            })
        }
    })

    new CfnOutput(this, 'cloudFrontDomain', {
        value: distribution.distributionDomainName
    })

    
  }
}
