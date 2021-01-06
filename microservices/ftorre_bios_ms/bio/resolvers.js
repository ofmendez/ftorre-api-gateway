'use strict';

const { generalRequest } = require('../../../utils/schema');
const config = require('config');

const URLq = `${config.microservices.ftorre_bios_ms.server.url}${config.microservices.ftorre_bios_ms.server.baseUrl}`;
const URLm = `${config.microservices.ftorre_people_search_ms.server.url}${config.microservices.ftorre_people_search_ms.server.baseUrl}`;

const resolvers = {
	Query: {
		getBio:(_, { username }, context) =>
			generalRequest(context, `${URLq}/${username}`, 'GET'),
		},
	Mutation: {
		findBio: (_, { size, offset, aggregate, term }, context) =>{
			let body = {"name":{"term": term}};
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