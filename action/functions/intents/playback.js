//
//
// intent fulfillment for playback
//
//@Author: coleman mchose, cole.mchose@gmail.com
const axios = require('axios');
const backend = 'http://capstone-env.ruehm2cvrs.us-east-2.elasticbeanstalk.com/api/'
const CONTEXTS = require('../lib/app-contexts');
const templates = require('../lib/test-data');
const utils  = require('../lib/standup-utils');
const strings = require('../lib/strings');

module.exports = {

	'playback': async (conv, params) => {
		conv.data.current_action = 'playback. ';
		console.log('in playback');
		//match team to input or it will reprompt the user
		conv.data.myContext = CONTEXTS.playback;
		conv.data.for_select = 'playback';	
		if(params && params.date){
			conv.data.date = params.date[0].substring(0,10);
		}
		if(!conv.data.current_team){
			const found_team = utils.teamValidation(conv,
				params.team_name); 
				if(!found_team){
					conv.contexts.set(CONTEXTS.select_team.name, 1);
					return conv.ask(utils.getPrompt(conv,
						'select_team', conv.data.db_teams));
				}
				else{
					conv.data.current_team = found_team;
				}
		}

		
		console.log(params);
		console.log(conv.user.profile.payload);
		const payload = conv.user.profile.payload;
		const email = payload.email; 
		const date = conv.data.date;
		console.log(email);
		console.log(date);
		try{
				console.log(backend+'standup/' + date + '/team/' +
					conv.data.current_team.teamName);

			const rs = await axios.get(
				backend+'standup/' + date + '/team/' + conv.data.current_team.teamName);
			console.log(rs.data);
			conv.data.standup = rs.data;

			conv.data.myContext = CONTEXTS.menu;
			conv.contexts.set(CONTEXTS.menu.name, 1);
			if(rs.data == null || rs.data == ''){
				conv.ask(utils.getPrompt(conv, 'no_standup', 
					{
						team : conv.data.current_team, 
					 	date: date
					}));
				conv.data.current_team = null;
				return 
			}
			return conv.ask(utils.getPrompt(conv, 'play_entire', conv.data.standup));
		} catch(error) {
			console.log(error)
			conv.data.myContext = CONTEXTS.menu;
			conv.contexts.set(CONTEXTS.menu.name, 1);
			conv.data.current_team = null;
			return conv.ask(utils.getPrompt(conv, 'no_standup',
					{
						team : conv.data.current_team, 
					 	date: date
					}));
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
			/*

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
			*/
