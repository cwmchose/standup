//@Author: coleman mchose, cole.mchose@gmail.com
const axios = require('axios');
const backend = 'http://capstone-env.ruehm2cvrs.us-east-2.elasticbeanstalk.com/api/'
const CONTEXTS = require('../lib/app-contexts');

module.exports = {
	'start-up' : async (conv) => {
		console.log('in start up');
		console.log(conv.user.profile.payload);
		//if they aren't signed in, get them to sign in
		if(conv.user.profile.payload == null){
			conv.contexts.set(CONTEXTS.menu, 0);
			return conv.ask("Looks like you haven't signed in to this app yet. If you would like to continue, "+
					"ask to sign in.");
		}
		const payload = conv.user.profile.payload;
		const email = payload.email; 
		//if they haven't signed up, ask them if they'd like to sign up 
		try{
			console.log('searching for user: ' + backend + 'user/email/' + email);
			var response = await axios.get(backend + 'user/email/' + email);
			conv.data.dbUser = response.data; //save thier user obj from the db
			console.log(conv.data);
			
		}catch (error) {
			if(error.status == 500){
				console.log(error);
				conv.contexts.set(CONTEXTS.create_account, 1);
				return conv.ask("It does not look like you have a Stand Up account yet, would you like to make one?");
			}
			console.log(error);
			return conv.close("Unable to connect to server, please try again later");
		}
		//if they don't belong to a team, inform them and end conversation
		try{
			console.log('looking for teams: ' +backend + 'team/user/' + email);
			var response1 = await axios.get(backend + 'team/user/' + email);
			conv.data.dbTeams = response1.data; //save their teams array from the db
			console.log(conv.data);
			if(conv.data.dbTeams.length == 0){
				//check for invites
				try{
					//var invites = await axios.get(backend + '/invites/' + conv.user.profile.email);	
					console.log('looking or invites');
					var invites = [];
					var invitestr = "Alpha Team";
					if(invites.length != 0){
						conv.contexts.set(CONTEXTS.join_team, 1);
						return conv.ask("You do not belong to a team yet but have an invite for " + invitestr + ", would you like to join any of them?");
					}
				}catch(error){
					console.log('no invites');
					return conv.close("Unable to connect to server, please try again later");
				}
				conv.contexts.set(CONTEXTS.create_team, 1);
				return conv.ask("You do not belong to a team and have no pending invites, would you like to make one?");
			}
		}catch(error){
			console.log(error);
			return conv.close("Unable to connect to server, please try again later");
		}
		
		console.log('made it');	
		//everything checks out
  	return conv.ask('Welcome back ' + conv.data.dbUser.firstName + ', you can create a stand up or playback previous ones.');
	}
};
