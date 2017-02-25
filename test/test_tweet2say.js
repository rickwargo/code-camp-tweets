////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2015-2016 Rick Wargo. All Rights Reserved.
//
// Licensed under the MIT License (the "License"). You may not use this file
// except in compliance with the License. A copy of the License is located at
// http://opensource.org/licenses/MIT or in the "LICENSE" file accompanying
// this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
// OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
////////////////////////////////////////////////////////////////////////////////

/*global describe, it */

'use strict';

var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    Text = require('../lib/text');

chai.use(chaiAsPromised);
chai.should();

////////////// Tests Tweet2Say //////////////

describe('Tweet2Say', function () {
    var tweet2say = require('../lib/helpers/tweet2say');

    describe('for status', function () {
        describe('that are empty', function () {
            it('should say no matching', function () {
                var result = tweet2say([]);
                return result.should.equal(Text.noMatchingTweets);
            });
        });
        describe('that contain an empty status', function () {
            it('should say no matching', function () {
                var result = tweet2say([{text: ''}]);
                return result.should.equal(Text.noMatchingTweets);
            });
            it('should say no matching', function () {
                var result = tweet2say([{text: null}]);
                return result.should.equal(Text.noMatchingTweets);
            });
            it('should say no matching', function () {
                var result = tweet2say([{text: undefined}]);
                return result.should.equal(Text.noMatchingTweets);
            });
        });
        describe('that are retweeted', function () {
            it('should say the retweet', function () {
                var result = tweet2say([{
                    user: {
                        name: 'tweeter'
                    },
                    retweeted_status: {
                        user: {
                            name: 'initial tweeter'
                        },
                        text: 'this message repeats'
                    },
                    text: 'RT this message repeats'
                }]);
                return result.should.equal('tweeter retweeted initial tweeter\'s tweet: this message repeats.');
            });
        });
        describe('that are tweeted', function () {
            it('should say the tweet', function () {
                var result = tweet2say([{
                    user: {
                        name: 'tweeter'
                    },
                    text: 'this message is tweeted'
                }]);
                return result.should.equal('tweeter tweeted: this message is tweeted.');
            });
            it('should say the tweet without a double period', function () {
                var result = tweet2say([{
                    user: {
                        name: 'tweeter'
                    },
                    text: 'this message is tweeted.'
                }]);
                return result.should.equal('tweeter tweeted: this message is tweeted.');
            });
        });
    });
});