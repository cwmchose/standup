//
//
// intent fulfillment for create
//
//@Author: coleman mchose, cole.mchose@gmail.com
const {
	Suggestions,
	SimpleResponse
} = require('actions-on-google');

const axios = require('axios');
const backend = 'http://capstone-env.ruehm2cvrs.us-east-2.elasticbeanstalk.com/api/'
const CONTEXTS = require('../lib/app-contexts');
const templates = require('../lib/test-data');
const utils  = require('../lib/standup-utils');
const strings = require('../lib/strings');


if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};



module.exports = {

	//entry point to creating a stand up 
	//checks if you already made one today,
	//	if they did, it gives the user the option to 
	//	review or overwrite the existing stand up
	//
	//	if not, the user should begin making a stand up 
	'create_standup': async (conv, params) => {
		conv.data.current_action = 'creating a stand up.';
		console.log(params);
		conv.data.myContext = CONTEXTS.today;
		if(!conv.data.team_selected){
		const found_team = utils.teamValidation(conv,params.team_name); 
			if(!found_team){
				return conv.ask(utils.getPrompt(conv, 'select_team', conv.data.db_teams));
			}
		}
		//team selected
		const today = utils.getTodaysDate();
		console.log('today: ' + today);
		conv.data.entry = templates.entry;
		const payload = conv.user.profile.payload;
		const email = payload.email; 
	
		try{
			//get entry from db for team for today
			const rs = await axios.get(backend+'entry/' + today + '/' + 
				conv.data.current_team.teamName );
			const todays_entries = rs.data;
			var entry = '';
			for(const standup of todays_entries){
				if(standup.team.teamName == conv.data.current_team){

				}	
			}
			if(entry){
				conv.data.update = 1;
				conv.data.entry = entry;
				conv.data.myContext = CONTEXTS.submit_review;
				conv.contexts.set(CONTEXTS.submit_review.name, 1);
				conv.contexts.set(CONTEXTS.today.name, 0);
				return conv.ask(utils.getPrompt(
					conv, 'already_existing', conv.data.current_team));
			}
		}catch(error){
			return conv.ask(utils.getPrompt(conv, 'http_error'));
		}
		conv.data.update = 0;
		conv.contexts.set(CONTEXTS.today.name, 1);
		return conv.ask(utils.getPrompt(conv, 'today'));
	},


	//accepts any speech, saves it
	'create_did_today' : (conv) => {
		console.log("in today");
		console.log(conv.input.raw);
		conv.data.myContext = CONTEXTS.tomorrow;
		conv.contexts.set(CONTEXTS.redo.name, 1);
		conv.data.redo_flag = 1;
		
		conv.data.entry.todayText = conv.input.raw;
		return conv.ask(utils.getPrompt(conv, 'tomorrow'));

	},



	//accepts any speech, saves it
	'create_do_tomorrow' : (conv) => {
		conv.data.myContext = CONTEXTS.blocking_choice;
		console.log("in tomorrow");
		console.log(conv.input.raw);
		console.log(conv.data);


		conv.contexts.set(CONTEXTS.redo.name, 1);
		conv.data.redo_flag = 2;

		conv.data.entry.tomorrowText = conv.input.raw;
		return conv.ask(utils.getPrompt(conv, 'blocking_choice'));

	},

	'create_blocking_yes' : (conv) => {
		conv.data.myContext = CONTEXTS.blocking_content;
		console.log("in blocking yes");

		conv.contexts.set(CONTEXTS.redo.name, 1);
		conv.data.redo_flag = 3;

		return conv.ask(utils.getPrompt(conv, 'blocking_yes'));
	},


	//User now either submits, reviews or exits
	'create_blocking_no' : (conv) => {
		conv.data.myContext = CONTEXTS.submit_review;
		console.log("in blocking no");

		conv.contexts.set(CONTEXTS.redo.name, 1);
		conv.data.redo_flag = 3;

		return conv.ask(utils.getPrompt(conv, 'submit_review'));
	},



	//accepts any speech, saves it. User now either submits, reviews or exits
	'create_blocking_content' : (conv) => {
		conv.data.myContext = CONTEXTS.submit_review;
		console.log("in blocking content");
		console.log(conv.input.raw);
		console.log(conv.data);
		conv.data.entry.blockingText = conv.input.raw;

		conv.contexts.set(CONTEXTS.redo.name, 1);
		conv.data.redo_flag = 3;

		return conv.ask(utils.getPrompt(conv, 'submit_review'));
	},

	'create_redo': (conv) => {
		if(conv.data.redo_flag == 1){
			console.log('redo 1');
			conv.data.myContext = CONTEXTS.today;
			conv.contexts.set(CONTEXTS.today.name, 1);
			return conv.ask(utils.getPrompt(conv, 'today'));	
			
		}
		else if(conv.data.redo_flag == 2){
			console.log('redo 2');
			conv.data.myContext = CONTEXTS.tomorrow;
			conv.contexts.set(CONTEXTS.tomorrow.name, 1);
			return conv.ask(utils.getPrompt(conv, 'tomorrow'));	

		}
		else if(conv.data.redo_flag == 3){
			console.log('redo 3');
			conv.data.myContext = CONTEXTS.blocking_choice;
			conv.contexts.set(CONTEXTS.blocking_choice.name, 1);
			return conv.ask(utils.getPrompt(conv, 'blocking_choice'));	

		}
		else{
			console.log('redo x');
			conv.data.myContext = CONTEXTS.menu;
			conv.contexts.set(CONTEXTS.menu.name, 1);
			return conv.ask(utils.getPrompt(conv, 'invalid_redo'));	
		}
	},

	'create_edit': (conv, params) => {
		conv.data.edit_choice = params.edit_choice;
		if(params.edit_choice == 'today' || params.edit_choice == 'tomorrow'){
			conv.data.myContext = CONTEXTS.editing;
			conv.contexts.set(CONTEXTS.editing.name, 1);
			return conv.ask(utils.getPrompt(conv, 'edit'));	
		}
		if(params.edit_choice == 'blocking'){
			conv.data.myContext = CONTEXTS.blocking_choice;
			conv.contexts.set(CONTEXTS.blocking_choice.name, 1);
			return conv.ask(utils.getPrompt(conv, 'blocking_choice'));	

		}
		
		conv.data.myContext = CONTEXTS.submit_review;
		conv.contexts.set(CONTEXTS.blocking_choice.name, 1);
		return conv.ask(utils.getPrompt(conv, 'today'));	
	},

	'create_editing' : (conv) => {
		const input = conv.input.raw;
		if(conv.data.edit_choice == 'today'){
			conv.data.entry.todayText = input;
		}
		if(conv.data.edit_choice == 'tomorrow'){
			tomorrow.data.entry.tomorrowText = input;
		}
		conv.data.myContext = CONTEXTS.submit_review;
		conv.contexts.set(CONTEXTS.blocking_choice.name, 1);
		return conv.ask(utils.getPrompt(conv, 'edit_done'));	
	},


	'create_review' : (conv) => {
		conv.data.myContext = CONTEXTS.submit_review;
		console.log("in submit review");
		console.log(conv.data);
		return conv.ask(utils.getPrompt(conv, 'review', conv.data.entry));
	},



	//tries to post entry to db, replies to the
	//user whether it was successful or not
	'create_submit' : async (conv) => {
		conv.data.myContext = CONTEXTS.menu;
		console.log("in submit yes");
		console.log(conv.data);
		//post standup entry
		try{
			var rs = '';
			if(conv.data.update)
				rs = await axios.post(backend + 'entry/' + conv.data.entry.standupEntryID, conv.data.entry);
			
			rs = await axios.post(backend + 'entry', conv.data.entry);
			console.log('swell');
			console.log(rs);
			return conv.ask("Your stand up was saved successfully.");
		} catch(error) {
			console.log('yikes');
			console.log(error);
			return conv.ask("failed to post submission");
		}

	},

};

/*
	'create_standup_dep': async (conv) => {
		console.log("in create");
		console.log(conv);
		console.log(conv.contexts);
		for(const context of conv.contexts){
			console.log(context.name);
			console.log(context.name.split('/').last());
		}
		console.log(CONTEXTS);
		
		
		console.log(conv.user.profile.payload);
		const payload = conv.user.profile.payload;
		const email = payload.email; 

		//made today
		var today = new Date();
		console.log(today);
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		const date = yyyy+'-'+mm+'-'+dd;	
		console.log('get: ' + backend+'entry/' + date + '/' + email);	
		
		var entry = {
			"date":	date,
			"user": {
				"userID": 1,
				"email": email,
				"firstName": payload.given_name,
				"lastName": payload.family_name
			},
			"todayText" : "",
			"tomorrowText": "",
			"blockingText": ""
		}
		conv.data.entry = entry;
		//get request for checking if a stand up has already been 
		try{
			//const rs = await axios.get(backend+'entry/' + date + '/' + email);
			const rs = {
				data: [test_data.test_entry]
			}
			console.log(rs.data);
			console.log(conv);
			console.log(conv.contexts);

			//if there's already a stand up, give them the option to review or just overwrite
			if(rs.data[0] != null){
				conv.data.entry = rs.data[0]; //initialize the entry to send back with the existing data
				conv.data.update = 1; //will have to do update instead of create post 
				conv.contexts.set(CONTEXTS.today.name, 0); //disable today intent
				conv.contexts.set(CONTEXTS.already_existing.name, 1); //enable overwrite and initial review intents
				conv.data.myContext = CONTEXTS.already_existing;
				console.log(conv.contexts);
				return conv.ask(strings.responses.create.existing);
			}
			


			conv.data.myContext = CONTEXTS.today;
			//else
			return conv.ask(strings.responses.create.none);
		} catch(error) {
			console.log(error)
			return conv.ask(strings.reponses.http_error);
		}
		
	},

	'create_initial_review_dep' : (conv) => {
		conv.data.myContext = CONTEXTS.already_exists;
		const entry = conv.data.entry;
		var response = utils.encodeEntry(entry);
		console.log(response);
		conv.ask(new SimpleResponse ({
			speech: response.speech,
			text: response.text
		}));
		conv.ask("Would you like to redo this stand up?");
	},
 *
 */
