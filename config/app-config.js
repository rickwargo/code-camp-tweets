/*jslint node: true */
'use strict';

var appConfig = {
    applicationId: 'amzn1.ask.skill.00000000-0000-0000-0000-000000000000', // Don't update here, update applicationid.json
    applicationName: 'code-camp-tweets',
    functionName: 'Code-Camp-Tweets',
    description: 'Retrieve tweets about Philly Code Camp'
};

// Allow applicationId to be held in separate file
var appId = require('./applicationid.json');
appConfig.applicationId = appId;


// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;
module.exports = appConfig;