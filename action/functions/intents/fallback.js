const CONTEXTS = require('../lib/app-contexts');

const fallbacks = [
	'Sorry, I didn\'t get that. \n',
	'I missed that. \n',
	'One more time? \n',
	'Sorry, I don\'t understand \n',
	'I missed what you said. \n'
];


module.exports = {

	'help': (conv) => {
		console.log('in help');
		console.log(conv.data.myContext);
		if(conv.data.myContext == null){
			conv.data.myContext = CONTEXTS.menu.name;	
			conv.contexts.set(CONTEXTS.menu.name, 1);
			console.log('menu');
		}
		else{
			conv.contexts.set(conv.data.myContext.name, 1);
			console.log('set');
		}
		conv.ask(conv.data.myContext.help);
	},
	'fallback': (conv) => {
		conv.ask(fallbacks[Math.floor(Math.random()* fallbacks.length)]);
		console.log('in help');
		console.log(conv.data.myContext);
		if(conv.data.myContext == null){
			conv.data.myContext = CONTEXTS.menu.name;	
			conv.contexts.set(CONTEXTS.menu.name, 1);
			console.log('menu');
		}
		else{
			conv.contexts.set(conv.data.myContext.name, 1);
			console.log('set');
		}
		conv.ask(conv.data.myContext.help);
	},


};

