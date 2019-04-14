const axios = require('axios');
const backend = 'http://capstone-env.ruehm2cvrs.us-east-2.elasticbeanstalk.com/api/'
const CONTEXTS = require('../lib/app-contexts');
const test_data = require('../lib/test-data');
const utils  = require('../lib/standup-utils');
const strings = require('../lib/strings');

module.exports = {
	
	'check_invites': async (conv) => {
		try{
			const response = {data: []}; //get invites
			conv.data.invites = response.data;
			if(response.data.length > 0){
				conv.data.team_to_add = response.data[0];
				conv.ask(); //invite prompt
				conv.contexts.set('invite_choice', 1);
			}
			else{
				conv.contexts.set('menu', 1);
				return conv.ask(utils.getPrompt(conv, 'no_invites'));
			}
		}
		catch(error){
			console.log(error);
			conv.contexts.set('menu', 1);
			return conv.ask(utils.getPrompt(conv, 'no_invites'));
		}
	},

	'accept_invite': async (conv) => {
		const email = conv.user.profile.payload.email
		try{
			//add user to team in db
			const rs = await axios.put(backend+'user/' + email  + '/' + 
				conv.data.team_to_add);
			console.log(rs);
			//add team to the list of teams 
			const rs2 = await axios.get(backend + 'team/' + conv.data.team_to_add);
			console.log(rs2);
			//delete invite
			const rs3 = await axios.get(backend + 'team/' + conv.data.team_to_add);
			conv.data.db_teams.push(rs2.data);
			conv.data.invites.shift();
			conv.ask('You successfully joined ' + conv.data.team_to_add + '. ')
		} catch(error) {
			conv.ask(utils.getPrompt(conv, 'http_error'))
		}
		if(conv.data.invites.length > 0){
			conv.contexts.set('invite_choice', 1);
			return conv.ask() //invite prompt
		}
		else{
			conv.contexts.set('menu', 1);
			return conv.ask(utils.getPrompt(conv, 'no_more_invites'));	
		}
	},

	'decline_invite' : async (conv) => {
		try{
			//delete invite
			const team_to_add = conv.data.invites[0].teamName; 
			const rs3 = await axios.get(backend + 'team/' + conv.data.team_to_add);
			conv.data.invites.shift();
			conv.ask('Invitation for '+ conv.data.team_to_add + 'declined. ');
		} catch(error) {
			conv.ask(utils.getPrompt(conv, 'http_error'))
		}
		if(conv.data.invites.length > 0){
			conv.contexts.set('invite_choice', 1);
			return conv.ask() //invite prompt
		}
		else{
			conv.contexts.set('menu', 1);
			return conv.ask(utils.getPrompt(conv, 'no_more_invites'));	
		}
	},

	'skip_invite' : (conv) => {
		const skip = conv.data.invites.shift();
		conv,data.invites.append(skip);
		if(conv.data.invites.length > 0){
				conv.contexts.set('invite_choice', 1);
				return conv.ask() //invite prompt
			}
		else{
				conv.contexts.set('menu', 1);
				return conv.ask(utils.getPrompt(conv, 'no_more_invites'));	
		}
	}

}

