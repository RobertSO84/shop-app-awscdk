#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { UiDeploymentStack } from '../lib/stacks/UiDeploymentStack';

const app = new App();
new UiDeploymentStack(app, 'ShopAppCdkStack');