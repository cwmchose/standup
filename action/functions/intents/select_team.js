const axios = require('axios');
const backend = 'http://capstone-env.ruehm2cvrs.us-east-2.elasticbeanstalk.com/api/'
const CONTEXTS = require('../lib/app-contexts');
const templates = require('../lib/test-data');
const utils  = require('../lib/standup-utils');
const strings = require('../lib/strings');

module.exports = {
	'select_team' : (conv, params) => { 
		console.log('in select');
		const teamValidation = utils.teamValidation(conv,params.team_name); 
		if(!teamValidation){
			conv.contexts.set(CONTEXTS.select_team.name, 1);
			return conv.ask(utils.getPrompt(conv, 'select_failed', params.team_name));
		}	
		conv.contexts.set(conv.data.myContext.name, 1);
		conv.ask(utils.getPrompt(conv, 'team_selected', 
			{ team: conv.data.current_team, action: conv.data.current_action}));
		conv.data.team_selected = true;	

	},
}
