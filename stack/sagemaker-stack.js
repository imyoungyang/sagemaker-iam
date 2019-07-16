"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require('@aws-cdk/core');
const iam = require("@aws-cdk/aws-iam");

/*
* iam policy statement
*/
const createS3Statement = () => {
  const statement = new iam.PolicyStatement(iam.PolicyStatementEffect.Allow);
  statement
    .addActions(['s3:ListBucket'])
    .addAllResources();
  return statement;
}


/*
* iam SageMaker Execution Role
*/
const addExuctionRolePolicy = (role) => {
  
  role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSageMakerFullAccess'))
  
  role.addToPolicy(new iam.PolicyStatement({
    resources: ['arn:aws:s3:::SageMaker', 'arn:aws:s3:::sagemaker/*'],
    actions: ['s3:ListBucket'] 
  }));
  
  role.addToPolicy(new iam.PolicyStatement({
    resources: ['arn:aws:s3:::SageMaker/*', 'arn:aws:s3:::sagemaker/*'],
    actions: ['s3:GetObject', 's3:PutObject', 's3:DeleteObject', 's3:CreateBucket']
  }));
  
  role.addToPolicy(new iam.PolicyStatement({
    resources: ['*'],
    actions: ['iam:GetRole']
  }));
}


//Stacks
class SageMakerSimpleStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    
    //IAM Role
    const role = new iam.Role(this, 'SageMakerExeuctionRole', {
      assumedBy: new iam.ServicePrincipal('sagemaker.amazonaws.com')
    });
    addExuctionRolePolicy(role);
  }
}
exports.SageMakerSimpleStack = SageMakerSimpleStack;