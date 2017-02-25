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

/*global describe, it, beforeEach */

'use strict';

var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

////////////// Tests Twitter //////////////

describe('Twitter', function () {
    describe('New Client', function () {
        var twitter;
        beforeEach(function () {
            // here for code coverage
            twitter = require('../lib/twitter');
        });

        it('should return an object', function () {
            return twitter.should.be.an('object');
        });
        it('should have a version of at least 1.7.0', function () {
            var versionCompare = require('./../vendor/version_compare');
            var comparison = versionCompare(twitter.VERSION, '1.7.0');
            return comparison.should.be.at.least(0);  // same or higher version
        });
    });
});