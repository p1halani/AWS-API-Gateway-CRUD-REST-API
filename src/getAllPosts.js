const db = require("../db");
const { ScanCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");

const {
	okResponse,
	internalServerError
} = require("../utils/responseCodes").responseMessages;

const handler = async () => {
    try {
        const { Items } = await db.send(new ScanCommand({ TableName: process.env.DYNAMODB_TABLE_NAME }));

        return okResponse({
            message: "Successfully retrieved all posts.",
            data: Items.map((item) => unmarshall(item)),
            Items,
        });
    } catch (e) {
        console.error(e);
        return internalServerError({
            message: "Failed to retrieve posts.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }
};

module.exports = {
    handler,
}