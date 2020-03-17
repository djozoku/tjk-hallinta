import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { buildSchema, AuthChecker } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';

import SampleResolver from './modules/sample/Sample.Resolver';
import { GraphQLContext } from './utils/GraphQLContext';

// check if we are in development
const isDev = process.env.NODE_ENV !== 'production';

// main function
const bootstrap = async () => {
  // Connect to the database
  await createConnection({
    name: 'default',
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: isDev,
    entities: [`${__dirname}/modules/**/*.Entity.*`],
    logging: isDev ? true : ['error'],
    ssl: !!parseInt(process.env.DATABASE_SSL || '1', 10),
  });

  // create server application
  const app = express();

  // Middleware:

  // CORS:
  app.use(cors({ credentials: true, origin: process.env.ORIGIN }));

  // req.body application/json support:
  app.use(express.json());

  // authorization checking for future
  const authChecker: AuthChecker<GraphQLContext> = () => {
    return false;
  };

  // Setup TypeGraphQL Schema
  const schema = await buildSchema({ resolvers: [SampleResolver], validate: false, authChecker });

  // Setup Apollo Server
  const server = new ApolloServer({
    schema,
    context: ({ req, res }): GraphQLContext => {
      return {
        req,
        res,
      };
    },
  });

  // apply Apollo Server instance to Express application
  server.applyMiddleware({ app, cors: false });

  // listen on port provided by system environment or .env file if in development
  app.listen(process.env.PORT, () => {
    // log application start
    console.log(`Server Started on port ${process.env.PORT}`);
  });
};

bootstrap();
