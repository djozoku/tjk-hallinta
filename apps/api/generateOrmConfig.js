/* eslint-disable */
require('dotenv/config');
const fs = require('fs');
const path = require('path');

const json = {
  name: 'default',
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/modules/**/*.Entity.*'],
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

fs.writeFileSync(path.join(__dirname, 'ormconfig.json'), JSON.stringify(json, null, 2), {
  encoding: 'utf8',
});
