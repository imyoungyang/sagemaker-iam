const cdk = require("@aws-cdk/core");
const { SageMakerSimpleStack } = require('../stack/sagemaker-stack.js');
//app
const app = new cdk.App();
var envName = process.env.ENV_NAME || 'prod';
const sageMakerStack = new SageMakerSimpleStack(app, `${envName}-sagemaker-stack`);

app.synth();