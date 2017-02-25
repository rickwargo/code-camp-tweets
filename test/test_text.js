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

////////////// Tests Text Routines //////////////

describe('Text', function () {
    describe('for LastTweet', function () {
        describe('of a single item', function () {
            it('is singular in its response', function () {
                var result = Text.lastTweets(1);
                return result.should.equal('The last 1 tweet was: ');
            });
            it('is plural in its response', function () {
                var result = Text.lastTweets(2);
                return result.should.equal('The last 2 tweets were: ');
            });
        });
    });

    describe('for exception message', function () {
        it('returns exception message if supplied', function () {
            var result = Text.exceptionMsg({message: "OOPS"});
            return result.should.equal("OOPS");
        });

        it('returns message if supplied', function () {
            var result = Text.exceptionMsg("OOPS");
            return result.should.equal("OOPS");
        });

        it('returns joined exception messages if supplied', function () {
            var result = Text.exceptionMsg([{message: "OOPS1"}, {message: "OOPS2"}]);
            return result.should.equal("OOPS1\nOOPS2");
        });

        it('returns joined heterogeneous messages if supplied', function () {
            var result = Text.exceptionMsg(["OOPS1", {message: "OOPS2"}]);
            return result.should.equal("OOPS1\nOOPS2");
        });

        it('returns joined messages if supplied', function () {
            var result = Text.exceptionMsg(["OOPS1", "OOPS2"]);
            return result.should.equal("OOPS1\nOOPS2");
        });
    });

    describe('for recent tweets from', function () {
        it('returns no one if no recent tweets', function () {
            var result = Text.recentTweetsFrom([]);
            return result.should.equal(Text.noRecentTweets);
        });
        it('returns one user if only one user', function () {
            var result = Text.recentTweetsFrom(['alpha']);
            return result.should.equal('Recent tweets were from: alpha.');
        });
        it('returns one user if only one user', function () {
            var result = Text.recentTweetsFrom(['alpha', 'beta', 'gamma']);
            return result.should.equal('Recent tweets were from: alpha, beta, and gamma.');
        });
    });
});