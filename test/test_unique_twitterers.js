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

/*global describe, it, context */

'use strict';

var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    unique_twitterers = require('../lib/helpers/unique_twitterers'),
    Constants = require('../lib/constants');

chai.use(chaiAsPromised);
chai.should();

////////////// Tests Twitter //////////////

describe('Unique Twitterers', function () {
    describe('Users', function () {
        context('of no length', function () {
            it('should be an empty list', function () {
                var result = unique_twitterers([], Constants.MAX_USERS);
                return result.should.deep.equal([]);
            });
        });
        context('of one unique user', function () {
            it('should be list of length one', function () {
                var result = unique_twitterers([{user: {name: 'alpha'}}], Constants.MAX_USERS);
                return result.should.deep.equal(['alpha']);
            });
            it('should be list of length one if duplicates', function () {
                var result = unique_twitterers([
                    {user: {name: 'alpha'}},
                    {user: {name: 'alpha'}},
                    {user: {name: 'alpha'}}
                ], Constants.MAX_USERS);
                return result.sort().should.deep.equal(['alpha']);
            });
        });
        context('of multiple unique users', function () {
            it('should be a list of the unique users', function () {
                var result = unique_twitterers([
                    {user: {name: 'alpha'}},
                    {user: {name: 'beta'}},
                    {user: {name: 'gamma'}}
                ], Constants.MAX_USERS);
                return result.sort().should.deep.equal(['alpha', 'beta', 'gamma']);
            });
            it('should be list of the unique users', function () {
                var result = unique_twitterers([
                    {user: {name: 'alpha'}},
                    {user: {name: 'beta'}},
                    {user: {name: 'gamma'}},
                    {user: {name: 'alpha'}},
                    {user: {name: 'gamma'}},
                    {user: {name: 'beta'}},
                    {user: {name: 'gamma'}},
                    {user: {name: 'gamma'}}
                ], Constants.MAX_USERS);
                return result.sort().should.deep.equal(['alpha', 'beta', 'gamma']);
            });
        });
    });
});