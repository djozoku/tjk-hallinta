import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { buildSchema, AuthChecker } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';

import { GraphQLContext, DataLoaders } from '@utils/GraphQLContext';
import OhjaajaLoader from '@module/ohjaaja/Ohjaaja.Loader';
import OppilasLoader from '@module/oppilas/Oppilas.Loader';
import TJKPaikkaLoader from '@module/tjkpaikka/TJKPaikka.Loader';
import VastuuopettajaLoader from '@module/vastuuopettaja/Vastuuopettaja.Loader';
import {
  YhdistelyIDLoader,
  YhdistelyOppilasLoader,
  YhdistelyTJKPaikkaLoader,
  YhdistelyVastuuopettajaLoader,
} from '@module/yhdistely/Yndistely.Loaders';
import RyhmaLoader from '@module/ryhma/Ryhma.Loader';

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
  const schema = await buildSchema({
    resolvers: [`${__dirname}/modules/**/*.Resolver.*`],
    validate: false,
    authChecker,
  });

  // Setup Apollo Server
  const server = new ApolloServer({
    schema,
    context: ({ req, res }): GraphQLContext => {
      const YhdistelyLoader = YhdistelyIDLoader();
      const loaders: DataLoaders = {
        OhjaajaLoader: OhjaajaLoader(),
        OppilasLoader: OppilasLoader(),
        RyhmaLoader: RyhmaLoader(),
        TJKPaikkaLoader: TJKPaikkaLoader(),
        VastuuopettajaLoader: VastuuopettajaLoader(),
        YhdistelyLoaders: {
          IDLoader: YhdistelyLoader,
          OppilasLoader: YhdistelyOppilasLoader(YhdistelyLoader),
          TJKPaikkaLoader: YhdistelyTJKPaikkaLoader(YhdistelyLoader),
          VastuuopettajaLoader: YhdistelyVastuuopettajaLoader(YhdistelyLoader),
        },
      };
      return {
        req,
        res,
        loaders,
      };
    },
    playground: true,
    introspection: true,
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
