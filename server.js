'use strict';

const express = require('express');
const app = express();
const grapQLHTTP = require('express-graphql');
const cors = require('cors');
const helmet = require('helmet');
const _logger = require('./utils/logger');
const logger = require('./middleware/logger');
const graphQLSchema = require('./graphQLSchema');
const { formatErr } = require('./utils/schema');

const corsOptions = {
  exposedHeaders: ['X-Auth', 'X-Total-Pages', 'X-Current-Page', 'X-Next-Page', 'X-Prev-Page', 'X-Total-Records'],
  origin: '*',
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}

// Middleware
app.use(express.json());
app.use(logger);
app.use(cors(corsOptions));
app.use(helmet());

// GraphQL
const graphQL = grapQLHTTP(
  async (request, response, graphQLParams) => ({
    schema: graphQLSchema,
    context: { req: request, res: response },
    customFormatErrorFn: formatErr,
    graphiql: true,
  })
);

app.use('/graphql', graphQL);

// Start server
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  _logger.info(`Listening on PORT: ${PORT}`);
});

module.exports = {
  server
}