//
//
// intent fulfillment for create
//
//@Author: coleman mchose, cole.mchose@gmail.com
const axios = require('axios');
const backend = 'http://capstone-env.ruehm2cvrs.us-east-2.elasticbeanstalk.com/api/'
const CONTEXTS = require('../lib/app-contexts');
const test_data = require('../lib/test-data');
const utils  = require('../lib/standup-utils');
const strings = require('../lib/strings');

module.exports = {

	'playback': async (conv, params) => {
		conv.data.current_action = 'listening to a stand up';
		console.log('in playback');
		//match team to input or it will reprompt the user
		const team_found = utils.teamValidation(conv,params.team_name); 
		if(team_found != null){
			return conv.ask(utils.getPrompt(conv, 'select_team', teams));
		}

		
		console.log(conv.user.profile.payload);
		const payload = conv.user.profile.payload;
		const email = payload.email; 
		const date = params.date.substring(0,10);
		console.log(email);
		console.log(date);
		try{
			const rs = await axios.get(backend+'standup/' + date + '/email/' + email);
			conv.data.standups = rs.data;
			if(rs.data[0] == null){
				conv.data.myContext = CONTEXTS.menu;
				conv.contexts.set(CONTEXTS.menu.name, 1);

				return conv.ask(utils.getPrompt(conv, 'no_standup', 
					{
						team : conv.data.current_team, 
					 	date: date
					}));
			}

			conv.data.myContext = CONTEXTS.playback;
			conv.contexts.set(CONTEXTS.playback.name, 1);

			for(const standup of conv.data.standups){
				if(standup.team.teamName == conv.data.current_team){
					conv.data.current_standup = standup
				}
			}

			console.log(rs.data);
			console.log(rs.data[0]);
			return conv.ask(utils.getPrompt(conv, 'playback_prompt'));

		} catch(error) {
			console.log(error)
			conv.data.myContext = CONTEXTS.menu;
			conv.contexts.set(CONTEXTS.menu.name, 1);
			return conv.ask(utils.getPrompt(conv, 'http_error'));
		}
	},

	'play_single_member' : (conv, params) => {
		console.log('in single member');
		console.log(params);

		conv.data.myContext = CONTEXTS.playback;
		conv.contexts.set(CONTEXTS.playback.name, 1);

		const member = utils.matchTeamMember(params);
		if(member == null){
			return conv.ask(utils.getPrompt(conv, 'invalid_member'));
		}
		
		conv.ask(utils.getPrompt(conv, 'play_entry', entry));
		return conv.ask(utils.getPrompt(conv, 'playback_prompt'));
	},

	'play_entire' : (conv) => {
			conv.contexts.set(CONTEXTS.playback.name, 1);
			conv.data.myContext = CONTEXTS.menu;
			conv.contexts.set(CONTEXTS.menu.name, 1);
			return conv.ask(utils.getPrompt(conv, 'play_entire', conv.data.standup));			
	}

};
