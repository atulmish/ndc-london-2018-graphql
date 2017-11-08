const assert = require("assert");

module.exports = mPool => {
  return {
    getTweets(top) {
      return mPool.collection('tweets')
        .find().sort({
          "tweeted_at": 1
        }).limit(top).toArray();
    },
    getTweetById(id) {
      return mPool.collection('tweets')
        .find({
          userId: {
            'tweet_id': id
          }
        })
    },
    getTweetsByUserId(id, limit)
    {
      return mPool.collection('tweets')
      .find({'createdby_user_id': id}).limit(top).toArray();
    },
    getUserById(id) {
      return mPool.collection('tweets')
        .findOne({'createdby_user_id': id});
    },
    getTotalTweetsByUserId(id){
      return mPool.collection('tweets')
      .find({'createdby_user_id': id}).count();
    },
    insertTweet(tweet) {
      return mPool.collection('tweets')
        .insertOne(tweet)
        .then(x => {
          return x.ops[0];
        });
    },
    getTotalTweets() {
      return mPool.collection('tweets').count();
    },
    getTopTweeters(top) {
      return mPool.collection('tweets').aggregate(
        [
          {
            $group : { 
              _id : "$createdby_user_id",
                                      user_profile_image: {$first:'$user_profile_image'},
                                      username: {$first:'$username'},
              "total_tweets" :  { $sum : 1 }
              },
              
            },
            {$sort: {"total_tweets": -1}} 
        ]
      ).limit(top).toArray();
    }
  };
};