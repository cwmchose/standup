const axios = require('axios');
const backend = 'http://capstone-env.ruehm2cvrs.us-east-2.elasticbeanstalk.com/api/'
const CONTEXTS = require('../lib/app-contexts');
const templates = require('../lib/test-data');
const utils  = require('../lib/standup-utils');
const strings = require('../lib/strings');

function respondToName(conv, params){
	const valid = utils.validateTeamName(params.team_name);
	//returns 1 if the name is valid
	if(valid == 1){
		conv.contexts.set(CONTEXTS.submit_team.name, 1);
		conv.data.myContext = CONTEXTS.confirm_name
		conv.data.pot_name = params.team_name;
		return conv.ask(utils.getPrompt(conv, 'confirm_team' , params.team_name));
	}
	else{
		conv.contexts.set(CONTEXTS.naming.name, 1);
		conv.data.myContext = CONTEXTS.naming;
		//2 means the team name was already taken
		if(valid == 2)
			return conv.ask(utils.getPrompt(conv, 'taken_name', params.team_name));
		return conv.ask(utils.getPrompt(conv, 'invalid_name', params.team_name));
	}
}

function checkForName(conv, params){
	console.log(params);
	if(params.team_name){
		return respondToName(conv,params);
	}
	else{ 
		conv.contexts.set(CONTEXTS.naming.name, 1);
		conv.data.myContext = CONTEXTS.naming;
		return conv.ask(utils.getPrompt(conv, 'get_name'));
	}
}

module.exports = {

	'create_team' : (conv, params) => {
		console.log('in create team');
		checkForName(conv,params);
	},
	'name_team' : (conv, params) => {
		console.log('in name');
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
		var team = templates.team;
		team.teamName = conv.data.pot_name;
		team.scrumMasterEmail = conv.data.db_user.email;
		team.users.push(conv.data.db_user);
		console.log(team);
		try { 
			//axios create team
			const rs = await axios.post(backend + 'team', team);
			//axios get teams
			console.log(rs);
			conv.ask(utils.getPrompt(conv, 'team_submit_success'));
		}catch (error) {
			console.log(error);
			conv.ask(utils.getPrompt(conv, 'team_submit_failure'));
		}
		try {
			const rs = await axios.get(backend + 'team/user/' + conv.data.db_user.email);
			console.log(rs);
			conv.data.db_teams = rs.data;
		}catch (error) {
			console.log(error);
			conv.ask(utils.getPrompt(conv, 'team_submit_failure'));
		}
		conv.data.myContext = CONTEXTS.menu;
	},
	
	
}
