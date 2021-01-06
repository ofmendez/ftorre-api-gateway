'use strict';

const axios = require('axios');
const { formatError } = require('graphql');

const generalRequest = async (context, url, method, body) => {
	try {
		let authorization = {};

		if (context.req.headers)
			if (context.req.headers.authorization)
				authorization = { 'authorization': context.req.headers['authorization'] }

		let response = await axios({
			method: method,
			url: url,
			data: body,
			headers: authorization
		});

		if (response.data)
			if (response.data.data) {
				response.data = response.data.data;

				if (response.headers['x-auth'])
					context.res.header('X-Auth', response.headers['x-auth']);
			}

		return response.data
	}

	catch (error) {
		return error;
	}
}

/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
const merge = (typeDefs, queries, mutations) => {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

const formatErr = (error) => {
	const data = formatError(error);
	const { originalError } = error;

	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}

	return data;
}

module.exports = {
	generalRequest,
	merge,
	formatErr,
}