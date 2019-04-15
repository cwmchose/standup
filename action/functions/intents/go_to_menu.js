const CONTEXTS = require('../lib/app-contexts');
const test_data = require('../lib/test-data');
const utils  = require('../lib/standup-utils');
const strings = require('../lib/strings');

module.exports = {
	'go_to_menu' : (conv) => {
		console.log('in go to menu');
		conv.data.current_team = null;
		conv.data.myContext = CONTEXTS.menu;
		conv.contexts.set(CONTEXTS.menu.name, 1);
		conv.ask(utils.getPrompt(conv, 'go_to_menu'));
	}
}
