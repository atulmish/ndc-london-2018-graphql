const DataLoader = require('dataloader');
const app = require('express')();

const hsSchema = require('./schema/schema');
const graphqlHTTP = require('express-graphql');

const { MongoClient } = require('mongodb');
const assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/twitterhs', (err, mPool) => {
  assert.equal(err, null);
  const dbcontext = require('./database/dbcontext')(mPool);

  app.use('/graphql', (req, res) => {
    const loaders = {
        getTweetsByUserId: new DataLoader(dbcontext.getTweetById),
        getUserByTweetId: new DataLoader(dbcontext.getTweetById),
    };
    graphqlHTTP({
      schema: hsSchema,
      graphiql: true,
      context: { dbcontext, loaders }
    })(req, res);
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});