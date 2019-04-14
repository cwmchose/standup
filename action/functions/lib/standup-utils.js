const strings = require('./strings');

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
		var re = /^[a-z0-9 ]+$/i;
		return re.exec(name) == null ? false : true ;
	},
	
	'getEntryForTeam' : (entries) => {
	
	},
	'getTodaysDate' : () => {
	
	},
	'teamValidation' : (conv, team_name) => {
			
	},
	'matchTeamMember' : (params) => {
	
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
