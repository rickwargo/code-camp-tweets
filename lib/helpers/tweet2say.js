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

'use strict';

var Text = require('./../text');


/**
 * Given a list of status messages from the Twitter API, turn it into an Alexa "sayable" string.
 * @param Object[] statuses   List of status messages from the Twitter API
 * @returns {String}
 */
function tweet2say(statuses) {
    if (statuses.length === 0 || !statuses[0].text) {
        return Text.noMatchingTweets;
    }

    var msg = '';
    statuses.forEach(function (tweet) {
        if (msg) {
            msg += " ";
        }
        if (tweet.retweeted_status) {
            msg += tweet.user.name + ' retweeted ' + tweet.retweeted_status.user.name + "'s tweet: ";
        } else {
            msg += tweet.user.name + ' tweeted: ';
        }

        if (tweet.retweeted_status) {
            msg += tweet.retweeted_status.text;
        } else {
            msg += tweet.text;
        }

        msg = msg.trim() + (msg.substr(-1) !== '.'
            ? '.'
            : '');
    });
    var re = /\s+https:\/\/t\.co\/[A-Z0-9a-z]+/gi;  // remove shorted url's from tweet
    return msg.replace(re, '');
}

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;
module.exports = tweet2say;