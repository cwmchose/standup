const utils  = require('./standup-utils');

function listTeams(teams){
	if(teams == null || teams.length == 0)
		return 'I don\'t think you\'re on any teams at the moment';
	var str = 'The teams I have you on are: \n';
	console.log(teams);
	for(const team of teams){
		console.log(team);
		str += team.teamName + '\n';
	}
	return str;
}

module.exports = {
	
	'prompts' : {
/****** SIGN IN ******/
		'ask_for_sign_in': {
			text: ['Signing in']
		},
		'ask_for_sign_in_confirmation': 'You need to sign in before using the app.',
		'create_account' : {
			text: ['It does not look like you have a Stand Up account yet, would you like to make one?']
		},
		'create_team' : {
			text: ['It does not look like you belong to a team, would you like to make one?']
		},
		
		
/****** CREATE STANDUP ******/
		'already_existing': {
			text: (team) => {
				return 'You already made a stand up for ' + team.teamName + 
					' today. You can review, edit and resubmit it if you\'d like, ' + 
					'or just return to the main menu.';
			}
		},
		'today' : {
			text: ['Ok, what did you do today',
			'What did you do today?'
			]
		},
		'tomorrow' : {
			text: ['Ok, what will you do tomorrow?',
			'Alright, what\'s your plan for tomorrow?'
			]
		},
		'blocking_choice' : {
			text: ['Is anything blocking you? ',
			'Alright, and is there anything blocking you? ']
		},
		'blocking_yes' : {
			text: ['Ok, what is blocking you? ',
			'Alright, and what is it?']
		},
		'edit' : {
			text: ['Ok, what should it be instead?', 'What do you want to change it to?']
		},
		'edit_done' : {
			text: ['Ok, let me know if you want to do anything else before submitting?', 
				'Got it, ']
		},
		'invalid_edit' : {
			text: ['I didn\'t understand, returning to submission menu...']
		},
		'invalid_redo' : {
			text: ['Oops, something went wrong, returning to menu...']
		},
		'review' : {
			text: (entry) => {
				var str = 'Here is the stand up you asked for:\n ';
				str += entry.todayText + '.\n ' + entry.tomorrowText + '.\n ';
				str += (entry.blockingText == null || entry.blockingText == '') ?
						' Nothing was blocking you.' :  'Something was blocking you. You said:\n ' + entry.blockingText;
				str += ".\n";
				return str;
			}
		},
		'submit_review' : {
			text: ['Ok, if you\'re ready to submit, ask to submit. If not, you can review and edit your submission']
		},
	
/****** PLAYBACK ******/ 

		'invalid_member' : {
			text: (data) => {
				return 'Sorry, I couldn\'t match ' + data.member +  ' to anyone on ' + 
					data.team + '.';
			}
		},
		'member_no_entry' : {
			text: (member) => {
				return 'I don\'t have anything for'  + member + 'on the day you asked for';
			}
		},
		'no_standup' : {
			text: (data) => {
				return 'Sorry, I didn\'t find any entries for ' + data.team.teamName + 
					'for ' + data.date + '.';
			}
		},
		'play_entire' : {
			text: (data) => {
				const team = data.team.teamName;
				const date = data.date;
				const standups = data.standups;

				var str = 'Ok, here is the stand up for ' + team + ' on ' + date + ': ';
				
				standups.forEach(standup => {
					str += standup.user.firstName + ' said, ' + standup.todayText +
					'. ' + standup.tomorrowText + '. ';
					str += (standup.blockingText == '' || standup.blockingText == null) ? 
						'Nothing was blocking them. ' : 
						'Something was blocking them, they said: ' + standup.blockingText + '. ';
				});
				console.log(str);
				return str;
				
			}
		},
		'playback_prompt' : {
			text: 'Ok, you can listen to a single team member\'s entry or the whole thing'
		},

/****** INVITES ******/
		'no_invites': {
			text: ['Sorry, I couldn\'t find any invitations', 
				'You do not have any pending invites'
				]
		},
		'no_more_invites': {
			text: ['There are no more invites, returning to main menu', 
				'You have no more pending invites'
				]
		},

/****** CREATE TEAM ******/
		'get_name': {
			text: ['Ok, what would you like to name your team?', 
				'What will the name for your team be?'
				]
			
		},
		'taken_name': {
			text: (name) => { 
				return 'Sorry, ' + name + ' is already taken. Please try something else.';
			}
		},
		'invalid_name': {
			text: (name) => { 
				return 'Sorry, ' + name + ' is an invalid name. Please try something else.';
			}
		},
		'review_name': {
			text: (name) => { 
				return 'I have ' + name + ' as the team name. ';
			}
		},
		'confirm_team': {
			text: (name) => { 
				return 'I have ' + name + ' as the team name, are you ready to submit this?';
			}
		},
		'team_submit_success': {
			text: ['Ok, your team was created successfully']
		},
		'team_submit_failure': {
			text: ['Sorry, something went wrong making your team. Please try again later.']
		},

/****** LIST TEAMS ******/
		'list_teams': {
			text: (teams) => {
				return listTeams(teams);
			}
		},

/****** EXTRAS ******/
		'select_failed': {
			text: (data) => {
				return 'Sorry, I could not match ' + data + ' with any of the teams I currently see you on. Please try again ';
			}
		},
		'team_selected': {
			text: (data) => {
				return 'Ok, ' + data.team.teamName + ' selected for ' + data.action + ' ';
			}
		},
		'select_team': {
			text: (teams) => {
				var str = 'What team would you like to do this for? '; 
				str += listTeams(teams);
				return str;
			}
		},
		'go_to_menu': {
			text: ['Ok, sending you to the menu']
		},
		'http_error': {
			text: ['there was an http error']
		},
		'abort_to_menu': {
			text: ['Ok, returning to menu']
		},
		'abort_final': {
			text: ['Goodbye', 'Until next time', 'Ok, see you later', 'Closing out']
		},

	},
	'responses' : {
		'ask_for_sign_in': 'testing sign in',
		'ask_for_sign_in_confirmation': 'You need to sign in before using the app.',
		'create': { 
			'existing': 'You already made a stand up for today. You can either say \"review\" '+
					'to hear what you said, or \"overwrite\" if you just want to redo it now.',	
			'none' : 'Ok, what did you do today',
				},
		'http_error': 'there was an http error',
		'go_to_menu': 'Ok, sending you to the menu'

	},
}
