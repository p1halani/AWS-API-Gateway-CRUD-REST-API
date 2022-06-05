const db = require("../db");
const { PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");

const {
	createResponse,
	internalServerError
} = require("../utils/responseCodes").responseMessages;

const handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Item: marshall(body || {}),
        };
        const createResult = await db.send(new PutItemCommand(params));

        return createResponse({
            message: "Successfully created post.",
            createResult,
        });
    } catch (e) {
        console.error(e);
        return internalServerError({
            message: "Failed to create post.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }
};

module.exports = {
    handler,
}