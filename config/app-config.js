/*jslint node: true */
'use strict';

module.exports = {
    applicationId: 'amzn1.ask.skill.44be0769-b790-43b7-a834-d3c474b85e59',   // Must update or all calls will fail on appIntent.pre()
    applicationName: 'code-camp-tweets',     // Must update this - no spaces, should be a valid identifier (hypens ok)
    functionName: 'Code-Camp-Tweets',        // Must update or gulp test-lambda will fail
    description: 'Retrieve tweets about Philly Code Camp'
};

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;
