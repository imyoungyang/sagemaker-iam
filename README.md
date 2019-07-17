# CDK for SageMaker

- [Done] Use CDK to create and update SageMaker execution role and related policies.
- [In progress] Use CDK to create SageMaker Training Instance

- CDK related information can found [here](https://docs.aws.amazon.com/cdk/api/latest/)

# Installation

## Install node.js 8
- sudo yum -y update
- Install nvm
    - `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash`
    - `source ~/.bashrc`
    - `nvm install v8.16.0`
    - `nvm default 8`

## Install CDK
- `npm install -g aws-cdk`
- `cdk --version`

## Deploy
- git clone this repo
- `cd sagemaker-iam`
- `cdk list`
- `cdk deploy`
