const CONTEXTS = require('../lib/app-contexts');

const phrases = [
	
];


module.exports = {

	'fallback': (conv) => {
		console.log('in fallback');
		console.log(conv.data.myContext);
		if(conv.data.myContext == null){
			conv.contexts.set(CONTEXTS.menu, 1);
			console.log('menu');
		}
		else{
			conv.contexts.set(conv.data.myContext, 1);
			console.log('set');
		}
		conv.ask('Sorry, can you say that again?');
	},


};
