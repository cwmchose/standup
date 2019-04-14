const axios = require('axios');
const backend = 'http://capstone-env.ruehm2cvrs.us-east-2.elasticbeanstalk.com/api/'
const CONTEXTS = require('../lib/app-contexts');
const test_data = require('../lib/test-data');
const utils  = require('../lib/standup-utils');
const strings = require('../lib/strings');

function respondToName(conv, params){
	const valid = utils.validateTeamName(params.team_name);
	if(valid == 1){
		conv.contexts.set(CONTEXTS.confirm_name.name, 1);
		conv.data.myContext = CONTEXTS.confirm_name
		conv.data.pot_name = params.team_name;
		return conv.ask(utils.getPrompt(conv, 'confirm_name' , params.team_name));
	}
	else{
		conv.contexts.set(CONTEXTS.naming.name, 1);
		conv.data.myContext = CONTEXTS.naming;
		if(valid == 2)
			return conv.ask(utils.getPrompt(conv, 'taken_name', params.team_name));
		return conv.ask(utils.getPrompt(conv, 'invalid_name', params.team_name));
	}
}

function checkForName(conv, params){
	if(params.team_name){
		return respondToName(conv,params);
	}
	else{ 
		conv.contexts.set(CONTEXTS.naming.name, 1);
		conv.data.myContext = CONTEXTS.naming;
		return conv.ask(utils.getPrompt(conv, 'get_name', params.team_name));
	}
}

module.exports = {

	'create_team' : (conv, params) => {
		console.log('in create team');
		checkForName(conv,params);
	},
	'rename_team' : (conv, params) => {
		console.log('in rename');
		checkForName(conv,params);
	},
	'review_name' : (conv) => {
		console.log('in review team');
		conv.contexts.set(CONTEXTS.confirm_name.name, 1);
		return conv.ask(utils.getPrompt(conv, 'review_name', conv.data.pot_name));
	},
	'submit_team' : async (conv) => {
		console.log('in submit team');
		try { 
			//axios create team
			//axios get teams
			//conv.data.db_teams = rs.data;
			conv.ask(utils.getPrompt(conv, 'team_submit_success'));
		}catch (error) {
			conv.ask(utils.getPrompt(conv, 'team_submit_failure'));
		}
		conv.data.myContext = CONTEXTS.menu;
	},
	
	
}
