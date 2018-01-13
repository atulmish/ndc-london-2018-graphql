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

