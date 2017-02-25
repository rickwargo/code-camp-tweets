/*jslint node: true */
/*global describe, it, context, beforeEach, afterEach */

'use strict';

var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    request = require('./helpers/request'),
    Text = require('../lib/text'),
    Twitter = require('../lib/twitter');

chai.use(chaiAsPromised);
chai.should();

var sinon = require('sinon');
var sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);

////////////// Tests Intents //////////////

describe('My Intents', function () {
    describe('against the Twitter API', function () {
        describe('#LatestTweets', function () {
            describe('response', function () {
                it('contains the latest tweets', function () {
                    var result = request.intentRequest({name: 'LatestTweets'});
                    return result.should.eventually.match(/<speak>The\ last\ 1\ tweet\ was:/);
                });
            });
        });
    });

    describe('using a mock client', function () {
        var get;
        beforeEach(function () {
            get = sinon.stub(Twitter, 'get').returnsPromise();
        });
        afterEach(function () {
            get.restore();
        });

        describe('#LatestTweets', function () {
            describe('response', function () {
                it('should return no recent tweets when there is none', function () {
                    get.resolves({statuses: []});
                    var result = request.intentRequest({name: 'LatestTweets'});
                    return result.should.eventually.equal('<speak>' + Text.noMatchingTweets + '</speak>');
                });
                it('should return tweets from matching user', function () {
                    get.resolves({
                        statuses: [
                            {user: {name: 'alpha'}, text: 'my tweet is the best tweet'},
                            {user: {name: 'beta'}, text: 'my tweet is the best tweet'},
                            {user: {name: 'gamma'}, text: 'my tweet is the best tweet'}
                        ]
                    });
                    var result = request.intentRequest({
                        name: 'LatestTweets',
                        slots: {
                            Count: {
                                name: 'Count',
                                value: '2'
                            },
                            User: {
                                name: 'User',
                                value: 'beta'
                            }
                        }
                    });
                    return result.should.eventually.equal('<speak>The last 1 tweet was: beta tweeted: my tweet is the best tweet.</speak>');
                });

                it('contains the latest tweets', function () {
                    get.resolves({statuses: [{user: {name: 'alpha'}, text: 'my tweet is the best tweet'}]});
                    var result = request.intentRequest({name: 'LatestTweets'});
                    return result.should.eventually.equal('<speak>The last 1 tweet was: alpha tweeted: my tweet is the best tweet.</speak>');
                });

                it('contains the recent tweet', function () {
                    get.resolves({statuses: [{user: {name: 'alpha'}, text: 'my tweet is the best tweet'}]});
                    var result = request.intentRequest({
                        name: 'LatestTweets',
                        slots: {
                            TweetCategory: {
                                name: 'TweetCategory',
                                value: 'recent'
                            }
                        }
                    });
                    return result.should.eventually.equal('<speak>The last 1 tweet was: alpha tweeted: my tweet is the best tweet.</speak>');
                });

                it('contains the most recent tweet', function () {
                    get.resolves({statuses: [{user: {name: 'alpha'}, text: 'my tweet is the best tweet'}]});
                    var result = request.intentRequest({
                        name: 'LatestTweets',
                        slots: {
                            TweetCategory: {
                                name: 'TweetCategory',
                                value: 'most recent'
                            }
                        }
                    });
                    return result.should.eventually.equal('<speak>The last 1 tweet was: alpha tweeted: my tweet is the best tweet.</speak>');
                });
                it('contains the popular tweet', function () {
                    get.resolves({statuses: [{user: {name: 'alpha'}, text: 'my tweet is the best tweet'}]});
                    var result = request.intentRequest({
                        name: 'LatestTweets',
                        slots: {
                            TweetCategory: {
                                name: 'TweetCategory',
                                value: 'popular'
                            }
                        }
                    });
                    return result.should.eventually.equal('<speak>The last 1 tweet was: alpha tweeted: my tweet is the best tweet.</speak>');
                });

                it('contains the most popular tweet', function () {
                    get.resolves({statuses: [{user: {name: 'alpha'}, text: 'my tweet is the best tweet'}]});
                    var result = request.intentRequest({
                        name: 'LatestTweets',
                        slots: {
                            TweetCategory: {
                                name: 'TweetCategory',
                                value: 'most popular'
                            }
                        }
                    });
                    return result.should.eventually.equal('<speak>The last 1 tweet was: alpha tweeted: my tweet is the best tweet.</speak>');
                });

                it('contains the latest COUNT tweets', function () {
                    get.resolves({statuses: [
                        {user: {name: 'alpha'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'beta'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'gamma'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'delta'}, text: 'my tweet is the best tweet'}
                    ]});
                    var result = request.intentRequest({
                        name: 'LatestTweets',
                        slots: {
                            Count: {
                                name: 'Count',
                                value: '3'
                            }
                        }
                    });
                    return result.should.eventually.equal('<speak>The last 3 tweets were: alpha tweeted: my tweet is the best tweet. beta tweeted: my tweet is the best tweet. gamma tweeted: my tweet is the best tweet.</speak>');
                });

                it('contains the latest COUNT tweets > MAXCOUNT', function () {
                    get.resolves({statuses: [
                        {user: {name: 'alpha'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'beta'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'gamma'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'delta'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'epsilon'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'zeta'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'eta'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'theta'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'iota'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'kappa'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'lambda'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'mu'}, text: 'my tweet is the best tweet'}
                    ]});
                    var result = request.intentRequest({
                        name: 'LatestTweets',
                        slots: {
                            Count: {
                                name: 'Count',
                                value: '333'
                            }
                        }
                    });
                    return result.should.eventually.equal('<speak>The last 10 tweets were: alpha tweeted: my tweet is the best tweet. beta tweeted: my tweet is the best tweet. gamma tweeted: my tweet is the best tweet. delta tweeted: my tweet is the best tweet. epsilon tweeted: my tweet is the best tweet. zeta tweeted: my tweet is the best tweet. eta tweeted: my tweet is the best tweet. theta tweeted: my tweet is the best tweet. iota tweeted: my tweet is the best tweet. kappa tweeted: my tweet is the best tweet.</speak>');
                });

                it('contains the latest tweet by USER', function () {
                    get.resolves({statuses: [
                        {user: {name: 'alpha'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'beta'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'gamma'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'delta'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'epsilon'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'zeta'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'eta'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'gamma'}, text: 'and this tweet is sweet'},
                        {user: {name: 'theta'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'iota'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'kappa'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'lambda'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'mu'}, text: 'my tweet is the best tweet'}
                    ]});
                    var result = request.intentRequest({
                        name: 'LatestTweets',
                        slots: {
                            User: {
                                name: 'User',
                                value: 'gamma'
                            }
                        }
                    });
                    return result.should.eventually.equal('<speak>The last 1 tweet was: gamma tweeted: my tweet is the best tweet.</speak>');
                });

                it('contains the latest COUNT tweets by USER', function () {
                    get.resolves({statuses: [
                        {user: {name: 'alpha'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'beta'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'gamma'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'delta'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'epsilon'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'zeta'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'eta'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'gamma'}, text: 'and this tweet is sweet'},
                        {user: {name: 'gamma'}, text: 'one more here'},
                        {user: {name: 'theta'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'iota'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'kappa'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'lambda'}, text: 'my tweet is the best tweet'},
                        {user: {name: 'mu'}, text: 'my tweet is the best tweet'}
                    ]});
                    var result = request.intentRequest({
                        name: 'LatestTweets',
                        slots: {
                            Count: {
                                name: 'Count',
                                value: 2
                            },
                            User: {
                                name: 'User',
                                value: 'gamma'
                            }
                        }
                    });
                    return result.should.eventually.equal('<speak>The last 2 tweets were: gamma tweeted: my tweet is the best tweet. gamma tweeted: and this tweet is sweet.</speak>');
                });
            });
        });

        context('#WhoTweeted', function () {
            it('should skip repeats of user names', function () {
                get.resolves({statuses: [
                    {user: {name: 'alpha'}},
                    {user: {name: 'beta'}},
                    {user: {name: 'gamma'}},
                    {user: {name: 'alpha'}},
                    {user: {name: 'beta'}}
                ]});
                var result = request.intentRequest({name: 'WhoTweeted'});
                return result.should.eventually.equal('<speak>Recent tweets were from: alpha, beta, and gamma.</speak>');
            });

            it('should say and more if more than MAX_USERS names', function () {
                get.resolves({statuses: [
                    {user: {name: 'alpha'}},
                    {user: {name: 'beta'}},
                    {user: {name: 'gamma'}},
                    {user: {name: 'delta'}},
                    {user: {name: 'epsilon'}},
                    {user: {name: 'zeta'}},
                    {user: {name: 'eta'}}
                ]});
                var result = request.intentRequest({name: 'WhoTweeted'});
                return result.should.eventually.equal('<speak>Recent tweets were from: alpha, beta, gamma, delta, and epsilon.</speak>');
            });

            it('say no tweets if could not find any', function () {
                get.resolves({statuses: []});
                var result = request.intentRequest({name: 'WhoTweeted'});
                return result.should.eventually.equal('<speak>' + Text.noRecentTweets + '</speak>');
            });
        });
    });
});

