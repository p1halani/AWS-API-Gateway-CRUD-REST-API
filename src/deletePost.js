const db = require("../db");
const { DeleteItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");

const {
	deleteResponse,
	internalServerError
} = require("../utils/responseCodes").responseMessages;

const handler = async (event) => {
    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ postId: event.pathParameters.postId }),
        };
        const deleteResult = await db.send(new DeleteItemCommand(params));

        return deleteResponse({
            message: "Successfully deleted post.",
            deleteResult,
        });
    } catch (e) {
        console.error(e);
        return internalServerError({
            message: "Failed to delete post.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }
};

module.exports = {
    handler,
}