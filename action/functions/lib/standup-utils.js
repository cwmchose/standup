const strings = require('./strings');
const fuzz = require('fuzzball');
const CONTEXTS = require('../lib/app-contexts');
const prompts = strings.prompts;

module.exports = {
	'getPrompt' : (conv, sel, data) => {
		if(data != null){
			console.log(data);
			return prompts[sel].text(data);
		}
		console.log(prompts);
		console.log(sel);
		console.log(prompts[sel]);
		console.log(prompts[sel].text);
		return prompts[sel].text[Math.floor(Math.random()* prompts[sel].text.length)];
	/*
		if(prompts.sel.speech != null)
			conv.ask(prompts.sel.speech);
		if(conv.hasAudioPlayback && prompts.sel.audio != null)
			conv.ask(prompts.sel.audio);
		if(conv.hasScreen && prompts.sel.visual != null)
			conv.ask(prompts.sel.visual);
		if(conv.hasWebBrowser && prompts.sel.web != null)
			conv.ask(prompts.sel.web);
	*/
	},

	'validateTeamName': (name) => {
		if(!name || name == '' || name.length>30)
			return false;
		//if it contains non alpha nums return false
		var re = /^[a-z0-9' ]+$/i;
		return re.exec(name) == null ? false : true ;
	},
	
	'getEntryForTeam' : (entries) => {
	
	},
	'getTodaysDate' : () => {
		var today = new Date();
		console.log(today);
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		const date = yyyy+'-'+mm+'-'+dd;	
		return date;
	},
	'teamValidation' : (conv, team_name) => {
		console.log('team val');
		if(conv.data.db_teams.length == 1){
			console.log('one team');
			//conv.data.current_team = conv.data.db_teams[0];
			return conv.data.db_teams[0];
		}

		if(team_name == null || team_name == ''){
			console.log('set sel team');
			//conv.contexts.set('select_team_context', 1);
			return null;
		}
		console.log(team_name);
		var teams = [];
		for(const team of conv.data.db_teams) {
			teams.push(team.teamName);
		}
		const results = fuzz.extract(team_name, teams);
		console.log(results);
		const best_match = results[0];
		if(best_match[1] < 40)
			return false;
		for(const team of conv.data.db_teams){
			if(team.teamName == best_match[0]){
				//conv.data.current_team = team
				return team;
			}
		}
		
	},
	'matchTeamMember' : (params) => {
		if(conv.data.db_teams.length == 1){
			conv.data.current_team = db_teams[0];
			return true;
		}

		if(team_name == null){
			conv.contexts.set(CONTEXTS.select_team, 1);
			return false;
		}

		var teams = [];
		for(const team of conv.data.db_teams) {
			teams.push(team.teamName);
		}
		const results = fuzz.extract(team_name, teams);
		console.log(results);
		const best_match = results[0];
		for(const team of conv.data.db_teams){
			if(team.teamName == best_match[0]){
				conv.data.current_team = team
				return true;
			}
		}
		
	
	},
	
	'encodeEntry' : (entry) => {
		var toUser = {
			speech: "",
			text: "",
			visual: ""
		}
		var str = 'Here is the stand up you asked for:\n ';
		str += entry.todayText + '.\n ' + entry.tomorrowText + '.\n ';
		str += (entry.blockingText == null || entry.blockingText == '') ?
				' Nothing was blocking you.' :  'Something was blocking you. You said:\n ' + entry.blockingText;
		str += ".\n";
	
		var ssml = '<speak>Here is the stand up you asked for <break time="2" /> ' ; 
		ssml += '<s>' + entry.todayText + '</s><s> ' + entry.tomorrowText + '</s><s>';
		ssml += (entry.blockingText == null || entry.blockingText == '') ?
				'Nothing was blocking you.' :  'Something was blocking you.</s><s> You said: ' + entry.blockingText;
		ssml += ".</s>";
		
		ssml += '</speak>'
	
		var visual = "";
	
		toUser.speech = ssml;
		toUser.text = str;
		toUser.visual = visual;
		return toUser;
	},
	
	'encodeStandup' :(standup) => {
			
	},

}
