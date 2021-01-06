'use strict';

const merge = require('lodash.merge');
// const _ = require('lodash');
const GraphQLJSON = require('graphql-type-json');
const schema = require('./utils/schema');
const { makeExecutableSchema } = require('graphql-tools');

// graphQL typeDefs
const bios = require('./microservices/ftorre_bios_ms/bio/typeDefs');
const opportunity = require('./microservices/ftorre_opportunities_ms/opportunity/typeDefs');

// merge the TypeDefs
const mergedTypeDefs = schema.merge(
	[
		'scalar JSON',
		bios.typeDefs,
		// opportunity.typeDefs,
	],
	[
		bios.queries,
		// opportunity.queries,
	],
	[
		bios.mutations,
		// opportunity.mutations,
	]
);

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		bios.resolvers,
		// opportunity.resolvers,
	)
});