/*jslint node: true */
'use strict';

module.exports = {
    region: 'us-east-1',
    profile: 'alexa-skill-author',
    role: 'arn:aws:iam::100866613345:role/lambda_basic_execution',
    handler: 'index.handler',
    timeout: 3,
    memorySize: 128,
    runtime: 'nodejs4.3'
};

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;
