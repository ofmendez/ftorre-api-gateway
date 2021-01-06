'use strict'
		// publicId: String
		// username: String
const typeDefs = `
	type Bio {
		person: Person
		strengths: [Strength]
		interests: [Interest]
	}

	type Strength{
		id: String
		name: String
	}

	type Interest{
		id: String
		name: String
	}

	type Person{
		professionalHeadline: String
		picture: String
		name: String
	}

	type Search{
		offset: Int,
		results: [Person]
		size: Int,
		total: Int
	}

	type Result{
		name: String
		locationName: String
		picture: String
	}


`

const queries = `
	getBio(username: String): Bio
`

const mutations = `
	findBio(size: Int, offset: Int, aggregate: Boolean, term: String): Search
`

module.exports = {
  resolvers: require('./resolvers'),
  typeDefs,
  queries,
  mutations,
}
