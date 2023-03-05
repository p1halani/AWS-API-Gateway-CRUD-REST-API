# AWS API Gateway CRUD REST API

## Achitecture

![API Gateway](./static/img/API%20Gateway%20CRUD.drawio.png)

## Video recording - https://www.loom.com/share/7cf350a819764779be24307add1deb7d

## Services used.
  - Serverless Framework for deployment.
  - GitHub actions for continuous integration and continuous delivery.
  - AWS Lambda
  - DynamoDB
  - AWS API Gateway
  - Cloudformation
  - Cloudwatch

## Steps to step up project locally

- Fork the Repo

- Create a user in AWS and store `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` in Github secrets

- Clone the forked repo in your local

- Install Dependencies

    ```bash
    npm install
    ```

- Install serverless

    ```bash
    npm install -g serverless@1.83.2
    ```

- Deploy

    ```bash
    serverless deploy --stage {prod/dev} --region {REGION} --verbose
    ```

    Note: Replace `STAGE` with your respective stage of development and `REGION` with the region you want to deploy in.

- Test the API

    Open Postman and copy the URL from the API Gateway and request with appropriate parameters and body.
