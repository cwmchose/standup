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
const test_data = require('../lib/test-data');
const utils  = require('../lib/standup-utils');
const string  = require('../lib/strings');

module.exports = {

	//entry point to creating a stand up 
	//checks if you already made one today,
	//	if they did, it gives the user the option to 
	//	review or overwrite the existing stand up
	//
	//	if not, the user should begin making a stand up 
	'create': async (conv) => {
		console.log("in create");
		console.log(conv);
		console.log(conv.contexts);
		console.log(CONTEXTS);
		
		
		console.log(conv.user.profile.payload);
		const payload = conv.user.profile.payload;
		const email = payload.email; 

		//made today
		var today = new Date();
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
				conv.contexts.set(CONTEXTS.today, 0); //disable today intent
				conv.contexts.set(CONTEXTS.already_existing, 1); //enable overwrite and initial review intents
				conv.data.myContext = CONTEXTS.already_existing;
				console.log(conv.contexts);
				return conv.ask(strings.responses.create.existing);
			}
			


			conv.data.myContext = CONTEXTS.today;
			//else
			return conv.ask('Ok, what did you do today');
		} catch(error) {
			console.log(error)
			return conv.ask('there was an http error');
		}
		
	},

	'create-initial-review' : (conv) => {
		conv.data.myContext = CONTEXTS.overwrite_choice;
		const entry = conv.data.entry;
		var response = utils.encodeEntry(entry);
		console.log(response);
		conv.ask(new SimpleResponse ({
			speech: response.speech,
			text: response.text
		}));
		conv.ask("Would you like to redo this stand up?");
	},

	//accepts any speech, saves it
	'create-did-today' : (conv) => {
		conv.data.myContext = CONTEXTS.tomorrow;
		console.log("in today");
		console.log(conv.input.raw);
		conv.data.entry.todayText = conv.input.raw;
		return conv.ask("Got it, what do you plan to do tomorrow?");

	},



	//accepts any speech, saves it
	'create-do-tomorrow' : (conv) => {
		conv.data.myContext = CONTEXTS.blocking_choice;
		console.log("in tomorrow");
		console.log(conv.input.raw);
		console.log(conv.data);
		conv.data.entry.tomorrowText = conv.input.raw;
		return conv.ask("Alright, is anything blocking you?");

	},

	'create-blocking-yes' : (conv) => {
		conv.data.myContext = CONTEXTS.blocking_content;
		console.log("in blocking yes");
	},


	//User now either submits, reviews or exits
	'create-blocking-no' : (conv) => {
		conv.data.myContext = CONTEXTS.submit_choice;
		console.log("in blocking no");
		return conv.ask("Okay. Would you like me to submit this? You can also review your submission now if you'd like.");
	},



	//accepts any speech, saves it. User now either submits, reviews or exits
	'create-blocking-content' : (conv) => {
		conv.data.myContext = CONTEXTS.submit_choice;
		console.log("in blocking content");
		console.log(conv.input.raw);
		console.log(conv.data);
		conv.data.entry.blockingText = conv.input.raw;
		return conv.ask("Okay. Would you like me to submit this? You can also review your submission now if you'd like.");
	},



	'create-submit-review' : (conv) => {
		conv.data.myContext = CONTEXTS.submit_choice;
		console.log("in submit review");
		console.log(conv.input.raw);
		console.log(conv.data);
		conv.data.submitText = conv.input.raw;
		conv.ask(utils.encodeEntry(conv.data.entry).text);
		return conv.ask("Ok, would you like to replay what I have so far before I save it?");
	},



	//tries to post entry to db, replies to the
	//user whether it was successful or not
	'create-submit-yes' : async (conv) => {
		conv.data.myContext = CONTEXTS.menu;
		console.log("in submit yes");
		console.log(conv.data);
		//post standup entry
		try{
			var rs = await axios.post(backend + 'entry', conv.data.entry)
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
