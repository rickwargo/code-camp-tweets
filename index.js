/*jslint node: true */
'use strict';

var app = require('./lib/app-starter'),
    Twitter = require('./lib/twitter'),
    Text = require('./lib/text'),
    Constants = require('./lib/constants'),
    tweet2say = require('./lib/helpers/tweet2say'),
    uniqueTwitterers = require('./lib/helpers/unique_twitterers');

Object.assign(app.dictionary, {
    tweet: ['tweet', 'tweets', 'item', 'items', 'story', 'stories', 'news', 'news item', 'news items', 'news story', 'news stories', 'post', 'posts', 'update', 'updates', 'message', 'messages'],
    latest: ['latest', 'last', 'recent', 'most recent'],
    whats: ['what is', 'what\'s', 'about', 'give me', 'tell me'],
    the: ['the', 'a', 'an']
});

var TwitterParams = {
    q: '#PhillyCode OR #PhillyCC OR @PhillyDotNet',
    result_type: 'recent', // options: 'recent', 'mixed', or 'popular'
    since_id: '',
    include_entities: false
};

app.customSlotType('TWEET_CATEGORIES', ['popular', 'latest', 'recent', 'last']);

app.intent('LatestTweets', {
    slots: {
        Count: 'AMAZON.NUMBER',
        User: 'AMAZON.US_FIRST_NAME',
        TweetCategory: 'TWEET_CATEGORIES'
    },
    utterances: [
        '{whats|} {the} {most|} {-|TweetCategory} {tweet}',
        '{whats|} {the} {most|} {-|TweetCategory} {-|Count} {tweet}',
        '{whats|} {the} {most|} {-|TweetCategory} {tweet} from {-|User}'
    ]
}, function (request, response) {
    var max_tweets = Math.min(request.slot('Count') || 1, Constants.MAX_TWEETS);
    var user = request.slot('User') || null;
    var tweetCategory = request.slot('TweetCategory') || 'recent';

    TwitterParams.result_type = tweetCategory.toLowerCase() === 'popular'
        ? 'popular'
        : 'recent';
    return Twitter.get('search/tweets', TwitterParams)
        .then(function (tweets) { // Filter
            var counter = 0;
            return tweets.statuses.filter(function (tweet) {
                // select if within max tweets and user matches, if specified
                var select = (counter < max_tweets) && (!user || tweet.user.name.toLowerCase().indexOf(user.toLowerCase()) > -1);
                if (select) {
                    counter += 1;
                }
                return select;
            });
        })
        .then(function (tweets) { // Say matching tweets
            var msg;
            if (tweets.length > 0) {
                msg = Text.lastTweets(tweets.length) + tweet2say(tweets);
            } else {
                msg = Text.noMatchingTweets;
            }
            response.say(msg);
        });
});

app.intent('WhoTweeted', {
    utterances: [
        'Who {tweeted|shared} {recently|}',
        'Who recently {tweeted|shared}'
    ]
}, function (ignore, response) {
    return Twitter.get('search/tweets', TwitterParams)
        .then(function (tweets) {
            var users = uniqueTwitterers(tweets.statuses, Constants.MAX_USERS);
            var msg = Text.recentTweetsFrom(users);

            response.say(msg);
        });
});


// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;
module.exports = app;
