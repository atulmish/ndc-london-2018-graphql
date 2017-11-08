const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList,
    GraphQLScalarType,
    GraphQLEnumType,
    GraphQLInputObjectType
} = require('graphql');

//dataloader
const UserType = new GraphQLObjectType({
    name: 'TwitterUser',
    description: 'Twitter user',
    fields: () => ({
        createdby_user_id: {
            type: GraphQLID 
        }, 
        screenname: {
            type: GraphQLString
        },
        username: {
            type: GraphQLString
        },
        user_profile_image: {
            type: GraphQLString
        },
        tweets: {
            type: new GraphQLList(TweetType),
            description: 'Get a list of tweets for current user',
            args: {
                limit: {
                    type: GraphQLInt,
                    defaultValue: 10
                }
            },
            resolve: ({id: user_id}, {limit}, context) => context.dbcontext.getTweetsByUserId(user_id, limit)
        }
    })

});

const MostActiveType = new GraphQLObjectType({
    name: 'MostActiveUser',
    description: 'Twitter user',
    fields: () => ({
        createdby_user_id: {
            type: GraphQLID 
        }, 
        username: {
            type: GraphQLString
        },
        user_profile_image: {
            type: GraphQLString
        },
        total_tweets: {
            type: GraphQLInt,
        }
    })
});

// dataloader
const TweetType = new GraphQLObjectType({
    name: 'Tweet',
    description: 'A tweet object',
    fields: () => ({
        tweet_id: {
            type: GraphQLID
        },
        tweeted_at: {
            type: GraphQLString
        },
        text: {
            type: GraphQLString
        },
        createdby_user_id:{
            type: GraphQLID
        },
        user: {
            type: UserType,
            resolve: (obj, args, context) => context.dbcontext.getUserById(obj.createdby_user_id)
        }
    })
});

const TweetActivtyType = new GraphQLObjectType({
    name: 'Tweet',
    description: 'A tweet object',
    fields: () => ({
        total: {
            type: GraphQLInt
        },
        activity: {
            type: new GraphQLList(ActivtyType)
        }
    })
});

const ActivtyType = new GraphQLObjectType({
    name: 'Tweet',
    description: 'A tweet object',
    fields: () => ({
        total: {
            type: GraphQLInt
        },
        time_period: {
            type: GraphQLString
        }
    })
});


const TweetInputType = new GraphQLInputObjectType({
    name: 'TweetInput',
    fields: {
        tweet_id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        tweeted_at: {
            type: new GraphQLNonNull(GraphQLString)
        },
        createdby_user_id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        username: {
            type: new GraphQLNonNull(GraphQLString)
        },
        screenname: {
            type: new GraphQLNonNull(GraphQLString)
        },
        user_profile_image: {
            type: new GraphQLNonNull(GraphQLString)
        },
        text: {
            type: new GraphQLNonNull(GraphQLString)
        }
    }
});

module.exports = {
    tweetType: TweetType,
    tweetInputType: TweetInputType,
    mostActiveType:MostActiveType
}