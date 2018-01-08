import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { createServer } from 'http';
import { subscriptionManager } from './subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import bodyParser from 'body-parser';
import express from 'express';
import { execute, subscribe } from 'graphql';
import schema from './schema';
import cors from 'cors';
import Promise from 'bluebird';
import db from 'sqlite';


import Patient from './data/models/Patient';
import Ward from './data/models/Ward';
import Medication from './data/models/Medication';
import Admission from './data/loaders';
 
let PORT = 3000;

const WS_GQL_PATH = '/subscriptions';
const app = express();
const server = createServer(app);

app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlExpress(req => {
    return {
      schema,
      context : {Patient, Ward, Medication,Admission},
      tracing: true
    };
  })
);
  
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: 'ws://localhost:3000/subscriptions'
  })
);

new SubscriptionServer({ schema, execute, subscribe }, {  server, path: WS_GQL_PATH });

Promise.resolve()
.then(() => db.open('./EHR.sqlite', {Promise, verbose: true}))
.then(() => db.driver.on('trace', console.log))
.then(() => db.migrate({ force: 'last' }))
.catch(err => console.error(err.stack))
.finally(() => {server.listen(PORT,err  => {
   console.log(`API Server is now running on http://localhost:${PORT}`); // eslint-disable-line no-console
   console.log(
     `API Server over web socket with subscriptions is now running on ws://localhost:${PORT}${WS_GQL_PATH}`
   ); // eslint-disable-line no-console
 })});
