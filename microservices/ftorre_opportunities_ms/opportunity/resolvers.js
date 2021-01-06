'use strict';

const { generalRequest } = require('../../../utils/schema');
const config = require('config');

const URLq = `${config.microservices.ftorre_opportunities_ms.server.url}${config.microservices.ftorre_opportunities_ms.server.baseUrl}`;
const URLm = `${config.microservices.ftorre_opportunities_search_ms.server.url}${config.microservices.ftorre_opportunities_search_ms.server.baseUrl}`;

const resolvers = {
	Query: {
		getOpportunity:(_, { id }, context) =>{
			console.log(`${URLq}/${id}`);
			return generalRequest(context, `${URLq}/${id}`, 'GET');
		}
		},
	Mutation: {
		findOpportunity: (_, { size, offset, aggregate, term }, context) =>{
			let body = {"skill/role":{"text":term ,"experience":"potential-to-develop"}};
			let query = "";
				query += `size=`+(size? `${size}` : `0`);
				query += `&offset=`+(offset? `${offset}` : `0`);
				query += `&aggregate=`+(aggregate? `${aggregate}` : `false`);
			return generalRequest(context, `${URLm}/?${query}`, 'POST', body );
		}
	}
}

module.exports = {
	...resolvers
}