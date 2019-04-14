//
//
// intent fulfillment for create
//
//@Author: coleman mchose, cole.mchose@gmail.com
const {
	Suggestions,
	SimpleResponse
} = require('actions-on-google');

const axios = require('axios');
const backend = 'http://capstone-env.ruehm2cvrs.us-east-2.elasticbeanstalk.com/api/'
const CONTEXTS = require('../lib/app-contexts');
const test_data = require('../lib/test-data');
const utils  = require('../lib/standup-utils');
const string  = require('../lib/strings');

module.exports = {
	'help' : (conv) => {
		
	}
}
