module.exports = {
	sign_in: {
		name:  "sign_in_context",
		reprompt: "",
		help: "ask to sign in to use the app"
	},
	menu: {
		name:  "menu_context",
		reprompt: "",
		help: "You're at the main menu. You can  make or edit your stand up for today and listen to your team's stand ups."
	},

/********* CREATEING STANDUP *********/
	already_existing: {
		name:  "already_existing_context",
		reprompt: "",
		help: "You've already made a stand up for this team today. You may review it, overwrite it, or select a different team."
	},
	today: {
		name:  "today_context",
		reprompt: "",
		help: "Say what you did today."
	},
	tomorrow: {
		name:  "tomorrow_context",
		reprompt: "",
		help: "Say what you plan on doing tomorrow"
	},
	blocking_choice: {
		name:  "blocking_choice",
		reprompt: "",
		help: "Is anything blocking you?"
	},
	blocking_content: {
		name:  "blocking_content_context",
		reprompt: "",
		help: "Say what's blocking you, or ask to redo what you've just said"
	},
	redo: {
		name:  "redo_context",
		reprompt: "",
		help: "What should I change it to?"
	},
	editing: {
		name:  "editing_context",
		reprompt: "",
		help: "What should I change it to?"
	},
	submit_review: {
		name:  "submit_review",
		reprompt: "",
		help: "Are you ready to submit your entry? If not, you can review, edit, or abandon it."
	},
	
	playback: {
		name:  "playback_context",
		reprompt: "",
		help: "You can listen to a single team member\'s entry or the whole thing"
	},


/********* CREATEING TEAM *********/
	naming: {
		name:  "naming_context", 
		reprompt: "",
		help: "state a name for your team"
	},
	submit_team: {
		name:  "submit_team_context", 
		reprompt: "",
		help: "you can finish creating the team, choose a different name, or abandon the submission"
	},


	select_team: {
		name:  "select_team_context",
		reprompt: "",
		help: "What team do you want to do this for?"
	},
	no_account: {
		name:  "no_account_context",
		reprompt: "",
		help: "With your permission, I'll make an account with Stand Up."
	},
	help: {
		name: "help_context"
	}
	
}
