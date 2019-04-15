const axios = require('axios');
const backend = 'http://capstone-env.ruehm2cvrs.us-east-2.elasticbeanstalk.com/api/'
const CONTEXTS = require('../lib/app-contexts');
const test_data = require('../lib/test-data');
const utils  = require('../lib/standup-utils');
const strings = require('../lib/strings');

module.exports = {
	'abort' : (conv) => {
		if(conv.data.myContext == CONTEXTS.menu){
			return conv.close(utils.getPrompt(conv, 'abort_final'));
		}
			return conv.ask(utils.getPrompt(conv, 'abort_to_menu'));
	}
}


