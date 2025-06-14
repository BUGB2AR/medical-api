import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'medical-scheduling-api',
  frameworkVersion: '4',
  plugins: ['serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  functions: {
    getAgendas: {
      handler: 'modules/agenda/controllers/getAgendas.handler',
      events: [
        {
          http: {
            method: 'get',
            path: 'agendas',
            cors: true,
          },
        },
      ],
    },
    createAgendamento: {
      handler: 'modules/agendamento/controllers/createAgendamento.handler',
      events: [
        {
          http: {
            method: 'post',
            path: 'agendamento',
            cors: true,
          },
        },
      ],
    },
  },
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
  },
};

module.exports = serverlessConfiguration;