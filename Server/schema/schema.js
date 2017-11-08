const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList
} = require('graphql');

const twitterTypes = require('./types');

const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        latestTweets: {
            type: new GraphQLList(twitterTypes.tweetType),
            description: 'Gets latest tweets for #halfstackconf hashtag',
            args: {
                top: {
                    type: GraphQLInt,
                    defaultValue: 10
                }
            },
            resolve: (obj, args, context) => context.dbcontext.getTweets(args.top)
        },
        topTweeters: {
            type: new GraphQLList(twitterTypes.mostActiveType),
            description: 'Gets top tweeters',
            args: {
                top: {
                    type: GraphQLInt,
                    defaultValue: 10
                }
            },
            resolve: (obj, args, context) => context.dbcontext.getTopTweeters(args.top)
        },
        tweetActivity: {
            type: twitterTypes.tweetType,
            description: 'Gets latest tweets for #halfstackconf hashtag',
            args: {
                top: {
                    type: GraphQLInt,
                    defaultValue: 10
                }
            },
            resolve: (obj, args, context) => context.dbcontext.getTweets(args.top)
        },
    })
});

const RootMutationType = new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => ({
        addTweet: {
            type: twitterTypes.tweetType,
            args: {
                input: {
                    type: new GraphQLNonNull(twitterTypes.tweetInputType)
                }
            },
            resolve(obj, {
                input
            }, context) {
                return context.dbcontext.insertTweet(input);
            }
        }
    })
});

const hsSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

module.exports = hsSchema;