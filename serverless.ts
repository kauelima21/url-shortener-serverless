import type { AWS } from '@serverless/typescript';

import createUrl from 'src/handlers/createUrl';
import updateUrl from 'src/handlers/updateUrl';
import getUrl from 'src/handlers/getUrl';
import urlTable from './config/resources/UrlTable';
import urlTableIam from './config/iam/UrlTableIAM';

const serverlessConfiguration: AWS = {
  service: 'url-shortener',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: "${opt:stage, 'dev'}",
    region: 'sa-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [
          urlTableIam
        ]
      }
    }
  },
  resources: {
    Resources: {
      ...urlTable
    }
  },
  // import the function via paths
  functions: { createUrl, updateUrl, getUrl },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    UrlTable: {
      name: '!Ref Url',
      arn: { 'Fn::GetAtt': ['UrlTable', 'Arn'] }
    }
  },
};

module.exports = serverlessConfiguration;
