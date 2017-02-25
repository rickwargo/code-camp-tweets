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

/**
 * Given a list of status messages from the Twitter API, find at most max_users unique people who tweeted in that list.
 * @param Object[] statuses   List of status messages from the Twitter API
 * @param {Number} max_users  Max number of unique users to be returned
 * @returns {Array}           List of at most max_users unique people who tweeted in statuses.
 */
function uniqueTwitterers(statuses, max_users) {
    var count = statuses.length > max_users
        ? max_users
        : statuses.length;
    var i = 0;
    var fullname, users = [];

    // Skip repeats of user names, don't exceed array length boundary
    while (count > 0 && i < statuses.length) {
        fullname = statuses[i].user.name;
        if (users.indexOf(fullname) === -1) {  // have not seen this twitter user yet
            count -= 1;                       // track number of users to find
            users.push(fullname);
        }
        i += 1;                               // and don't exceed number of statuses
    }
    return users;                             // return list of seen, unique users in order seen
}

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;
module.exports = uniqueTwitterers;