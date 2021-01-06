'use strict'
		// publicId: String
		// username: String
const typeDefs = `
	type Opportunity {
		id: String
		objective: String
		details: [Detail]
		created: String
		deadline: String
		status: String
		organizations: [Organization]
		compensation: Compensation
	}

	type OpportunityB {
		id: String
		objective: String
		deadline: String
		status: String
		organizations: [Organization]
		compensation: CompensationB
	}

	type Detail{
		code: String
		content: String
	}

	type CompensationB{
		data: Compensation
	}

	type Compensation{
        currency: String
        minAmount: Int
        maxAmount: Int
        periodicity: String
	}

	type Organization{
		id: String
		name: String
		picture: String
	}


	type SearchOrg{
		offset: Int
		results: [OpportunityB]
		size: Int
		total: Int
	}
`

const queries = `
	getOpportunity(id: String): Opportunity
`

const mutations = `
	findOpportunity(size: Int, offset: Int, aggregate: Boolean, term: String): SearchOrg
`

module.exports = {
  resolvers: require('./resolvers'),
  typeDefs,
  queries,
  mutations,
}
