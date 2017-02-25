/*jslint node: true */
'use strict';

var promise = require('bluebird');
var AWS = require('aws-sdk'),
    Config = require('../config/aws-config');

AWS.config.update({
    region: Config.region,
    credentials: new AWS.SharedIniFileCredentials({profile: Config.profile})
});

var DynamoDB = require('./helper/dynamodb');
var dynamodbDoc = new AWS.DynamoDB.DocumentClient();

console.log('Welcome to the playground');
promise.promisifyAll(Object.getPrototypeOf(dynamodbDoc), {suffix: '_Async'});