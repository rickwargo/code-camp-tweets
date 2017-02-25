/*jslint node: true */
'use strict';

var textHelper = {
    failedResponse: 'I\'m sorry. There was a problem processing this request. The Alexa card may have more details. Goodbye.',
    onLaunchPrompt: 'Welcome to Code Camp Tweets. You can ask for recent tweets or who has tweeted.',
    help: 'You can ask for an update, a number of recent tweets, or who has tweeted recently.',
    helpAfterPause: 'You can ask for an update or ask who has tweeted.',
    goodbye: 'Thank you for interacting with me. Goodbye.',

    noMatchingTweets: 'There were no matching tweets.',
    noRecentTweets: 'There were no recent tweets.',

    lastTweets: function (n) {
        return `The last ${n} tweet` + (n === 1
            ? ' was: '
            : 's were: ');
    },

    /**
     * Recursively attempt to build an Alexa "sayable" string that represents the supplied exception object.
     * @param exc
     * @returns {string}
     */
    exceptionMsg: function (exc) {
        var thisForScopeIssueInJSLint = this;
        return exc.message || (Array.isArray(exc)
            ? exc.map(function (e) {
                return thisForScopeIssueInJSLint.exceptionMsg(e);
            }).join("\n")
            : exc);
    },

    /**
     * Combine list of users into Alexa "sayable" string.
     * @param users       List of twitter users
     * @returns {String}
     */
    recentTweetsFrom: function (users) {
        var msg;
        if (users.length === 0) {                 // could not find any tweets recently
            msg = this.noRecentTweets;
        } else {
            msg = 'Recent tweets were from: ';
            if (users.length === 1) {
                msg += users[0];
            } else {
                msg += users.slice(0, -1).join(', ') + ', and ' + users.slice(-1);
            }
            msg += '.';
        }
        return msg;
    }

};

module.change_code = 1;
module.exports = textHelper;
