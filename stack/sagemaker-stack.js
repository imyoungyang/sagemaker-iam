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

/*
* iam SageMaker Workshop Group
*/
const addGroupPolicy = (group) => {
  group.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSageMakerFullAccess'));
  group.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSCloud9Administrator'));
  group.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLogsReadOnlyAccess'));
  
  group.addToPolicy(new iam.PolicyStatement({
    resources: ['arn:aws:s3:::SageMaker', 'arn:aws:s3:::sagemaker/*'],
    actions: ['s3:ListBucket'] 
  }));
  
  group.addToPolicy(new iam.PolicyStatement({
    resources: ['arn:aws:s3:::SageMaker/*', 'arn:aws:s3:::sagemaker/*'],
    actions: ['s3:GetObject', 's3:PutObject', 's3:DeleteObject', 's3:CreateBucket']
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
    
    //User Group
    const group = new iam.Group(this, 'SageMakerWorkshop');
    addGroupPolicy(group);
  }
}
exports.SageMakerSimpleStack = SageMakerSimpleStack;