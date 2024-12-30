import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
const ddb = new DynamoDBClient({});
import { v4 as uuidv4 } from 'uuid';
const tableName = process.env.TABLE_NAME;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

export const lambdaHandler = async (event, context) => {
  try {
    const input_params = {
        TableName: tableName,
        Select: "ALL_ATTRIBUTES"
    };
    
    const command = new ScanCommand(input_params);
    const response = await ddb.send(command);

    return {
        'statusCode': 200,
        'body': JSON.stringify({
            message: response.Items
            //message: 'Sprinkled, Glazed, Apple Fritter, Crumb, Raspberry Filled',
        })
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
  