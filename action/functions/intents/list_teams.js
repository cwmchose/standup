const axios = require('axios');
const backend = 'http://capstone-env.ruehm2cvrs.us-east-2.elasticbeanstalk.com/api/'
const CONTEXTS = require('../lib/app-contexts');
const test_data = require('../lib/test-data');
const utils  = require('../lib/standup-utils');
const strings = require('../lib/strings');

module.exports = {
	'list_teams' : (conv) => {
		console.log(conv.data.db_teams);
		return conv.ask(utils.getPrompt(conv, 'list_teams', conv.data.db_teams));
	}
}
