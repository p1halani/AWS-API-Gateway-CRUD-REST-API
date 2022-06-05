const db = require("../db");
const { GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const {
	okResponse,
	internalServerError
} = require("../utils/responseCodes").responseMessages;

const handler = async (event) => {
	try {
		const params = {
				TableName: process.env.DYNAMODB_TABLE_NAME,
				Key: marshall({ postId: event.pathParameters.postId }),
		};
		const { Item } = await db.send(new GetItemCommand(params));

		console.log({ Item });
		return okResponse({
							message: "Successfully retrieved post.",
							data: (Item) ? unmarshall(Item) : {},
							rawData: Item,
					});
	} catch (e) {
		console.error(e);
		return internalServerError({
				message: "Failed to get post.",
				errorMsg: e.message,
				errorStack: e.stack,
		});
	}
};

module.exports = {
    handler,
}