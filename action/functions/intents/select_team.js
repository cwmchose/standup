const axios = require('axios');
const backend = 'http://capstone-env.ruehm2cvrs.us-east-2.elasticbeanstalk.com/api/'
const CONTEXTS = require('../lib/app-contexts');
const templates = require('../lib/test-data');
const utils  = require('../lib/standup-utils');
const strings = require('../lib/strings');
const create = require('../intents/create');
const playback = require('../intents/playback');


module.exports = {
	'select_team' : (conv, params) => { 
		console.log('in select');
		const found_team = utils.teamValidation(conv,
			params.team_name); 
		if(!found_team){
			conv.contexts.set(CONTEXTS.select_team.name, 1);
			return conv.ask(utils.getPrompt(conv, 
				'select_failed', params.team_name));
		}	
		console.log('swell');
		conv.data.current_team = found_team;
		conv.ask(utils.getPrompt(conv, 'team_selected', 
			{ team: conv.data.current_team, 
				action: conv.data.current_action}));
		console.log(conv.data.myContext);
		console.log('swell');
		if(conv.data.myContext.name == CONTEXTS.today.name){
			console.log('yikes');
			return create.create_standup(conv);
		}
		if(conv.data.myContext.name == CONTEXTS.playback.name){
			return playback.playback(conv);
		}
	},
}
