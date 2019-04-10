//
//
// intent fulfillment for create
//
//
const Suggestions = require('actions-on-google');
module.exports = {

	'create': (conv) => {
		console.log("in create");
		console.log(conv);
		
		var exists = 0;
		if(exists)
			return conv.ask(new Suggestions('recreate'));
		
		//else
		return conv.ask('Ok, what did you do today');
	},
	'create-did-today' : (conv) => {
		console.log("in today");
		console.log(conv.input.raw);
		conv.data.todayText = conv.input.raw;
		return conv.ask("Got it, what do you plan to do tomorrow?");

	},
	'create-do-tomorrow' : (conv) => {
		console.log("in tomorrow");
		console.log(conv.input.raw);
		console.log(conv.data);
		conv.data.tomorrowText = conv.input.raw;
		return conv.ask("Alright, is anything blocking you?");

	},
	'create-blocking-content' : (conv) => {
		console.log("in blocking content");
		console.log(conv.input.raw);
		console.log(conv.data);
		conv.data.blockingText = conv.input.raw;
		return conv.ask("Okay. Would you like me to submit this? You can also review your submission now if you'd like.");
	},
	'create-submit-yes' : (conv) => {
		console.log("in submit yes");
		console.log(conv.input.raw);
		console.log(conv.data);
		try{
			const rs = await axios.post(backend+'entry/' + date + '/' + email);
			console.log(rs.data);
			console.log(rs.data[0].data);
			return conv.ask(rs.data[0].data);
		} catch(error) {
			console.log(error)
			return conv.ask('Sorry, there was an http error when I tried to save your request.' +
				'I will save your stand up for now. Just ask to resubmit and I will try the post again');
		}

		return conv.ask("Your stand up was saved successfully.");
	},
	'create-submit-review' : (conv) => {
		console.log("in submit content");
		console.log(conv.input.raw);
		console.log(conv.data);
		conv.data.submitText = conv.input.raw;
		return conv.ask("Ok, would you like to replay what I have so far before I save it?");
	},

};
