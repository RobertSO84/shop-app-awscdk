#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { UiDeploymentStack } from '../lib/stacks/UiDeploymentStack';
import { ShopAppCdkStack } from '../lib/shop-app-cdk-stack';

const app = new App();
new UiDeploymentStack(app, 'DeploymentShopAppCdkStack');
new ShopAppCdkStack(app, 'ShopAppCdkStack')