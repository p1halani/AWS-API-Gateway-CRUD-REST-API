const db = require("../db");
const { UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");

const {
	updateResponse,
	internalServerError
} = require("../utils/responseCodes").responseMessages;

const handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const objKeys = Object.keys(body);
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ postId: event.pathParameters.postId }),
            UpdateExpression: `SET ${objKeys.map((_, index) => `#key${index} = :value${index}`).join(", ")}`,
            ExpressionAttributeNames: objKeys.reduce((acc, key, index) => ({
                ...acc,
                [`#key${index}`]: key,
            }), {}),
            ExpressionAttributeValues: marshall(objKeys.reduce((acc, key, index) => ({
                ...acc,
                [`:value${index}`]: body[key],
            }), {})),
        };
        const updateResult = await db.send(new UpdateItemCommand(params));

        return updateResponse({
            message: "Successfully updated post.",
            updateResult,
        });
    } catch (e) {
        console.error(e);
        return internalServerError({
            message: "Failed to update post.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }
};

module.exports = {
    handler,
}