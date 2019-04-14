//@Author: coleman mchose, cole.mchose@gmail.com
const axios = require('axios');
const backend = 'http://capstone-env.ruehm2cvrs.us-east-2.elasticbeanstalk.com/api/'
const CONTEXTS = require('../lib/app-contexts');
const utils  = require('../lib/standup-utils');
const strings = require('../lib/strings');

module.exports = {
	'start_up' : async (conv) => {

		console.log('in start up');
		console.log(conv.user.profile.payload);
		//if they aren't signed in, get them to sign in
		if(conv.user.profile.payload == null){
			conv.contexts.set(CONTEXTS.menu.name, 0);
			conv.contexts.set(CONTEXTS.sign_in.name, 1);
			return conv.ask(utils.getPrompt('ask_for_sign_in'));
		}
		const payload = conv.user.profile.payload;
		const email = payload.email; 
		//if they haven't signed up, ask them if they'd like to sign up 
		try{
			console.log('searching for user: ' + backend + 'user/email/' + email);
			var response = await axios.get(backend + 'user/email/' + email);
			conv.data.db_user = response.data; //save thier user obj from the db
			console.log(conv.data);
			
		}catch (error) {
			if(error.response){
				if(error.response == 500){
					conv.contexts.set(CONTEXTS.menu.name, 0);
					console.log(error);
					conv.contexts.set(CONTEXTS.no_account.name, 1);
					conv.data.myContext = CONTEXTS.no_account;	
					return conv.ask(utils.getPrompt(conv, 'create_account'));
				}
				console.log(error);
				return conv.close(utils.getPrompt(conv, 'http_error'));
			}
			console.log(error);
			return conv.close(utils.getPrompt(conv, 'http_error'));
		}
		//if they don't belong to a team, inform them and end conversation
		try{
			console.log('looking for teams: ' +backend + 'team/user/' + email);
			var response1 = await axios.get(backend + 'team/user/' + email);
			conv.data.db_teams = response1.data; //save their teams array from the db
			console.log(conv.data);
			if(conv.data.db_teams.length == 0){
				//check for invites
				try{
					//var invites = await axios.get(backend + '/invites/' + conv.user.profile.email);	
					console.log('looking or invites');
					var invites = [];
					var invitestr = "Alpha Team";
					if(invites.length != 0){
						conv.contexts.set(CONTEXTS.menu.name, 0);
						//conv.contexts.set(CONTEXTS.join_team.name, 1);
						return conv.ask("You do not belong to a team yet but have an invite for " + invitestr + ", would you like to join any of them?");
					}
				}catch(error){
					console.log('no invites');
					return conv.close(utils.getPrompt(conv, 'http_error'));
				}
				//conv.contexts.set(CONTEXTS.create_team.name, 1);
				conv.contexts.set(CONTEXTS.menu.name, 0);
				conv.contexts.set(CONTEXTS.create_team.name, 1);
				conv.data.myContext = CONTEXTS.create_team;	
				return conv.ask(utils.getPrompt(conv,'create_team'));
			}
		}catch(error){
			console.log(error);
			return conv.close(utils.getPrompt(conv, 'http_error'));
		}
		
		conv.contexts.set(CONTEXTS.menu.name, 1);
		console.log('made it');	
		conv.data.myContext = CONTEXTS.menu;	
		//everything checks out
  	return conv.ask('Welcome back ' + conv.data.db_user.firstName + ', you can create a stand up or playback previous ones.');
	}
};
