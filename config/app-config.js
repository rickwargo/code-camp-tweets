/*jslint node: true */
'use strict';

module.exports = {
    applicationId: 'amzn1.ask.skill.00000000-0000-0000-0000-000000000000', // Don't update here, update applicationid.json
    applicationName: 'code-camp-tweets',     // Must update this - no spaces, should be a valid identifier (hypens ok)
    functionName: 'Code-Camp-Tweets',        // Must update or gulp test-lambda will fail
    description: 'Retrieve tweets about Philly Code Camp'
};

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;
