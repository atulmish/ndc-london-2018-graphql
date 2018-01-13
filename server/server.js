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
 
let PORT = 3000;

const app = express();
const server = createServer(app);

app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import Patient from './data/models/Patient';
import Medication from './data/models/Medication';
import Admission from './data/models/Admission';
import Ward from './data/models/Ward'

app.use(
  '/graphql',
  graphqlExpress(req => {
    return {
      schema,
      context : {Patient, Medication,Admission, Ward}
    };
  })
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
);


Promise.resolve()
.then(() => db.open('./EHR.sqlite', {Promise, verbose: true}))
.then(() => db.driver.on('trace', console.log))
.then(() => db.migrate({ force: 'last' }))
.finally(() => {server.listen(PORT,err  => {
   console.log(`API Server is now running on http://localhost:${PORT}`); // eslint-disable-line no-console
 })});

