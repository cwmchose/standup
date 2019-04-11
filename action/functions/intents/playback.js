//
//
// intent fulfillment for create
//
//@Author: coleman mchose, cole.mchose@gmail.com
const axios = require('axios');
const backend = 'http://capstone-env.ruehm2cvrs.us-east-2.elasticbeanstalk.com/'
const app = require('../app');

function makePlaybackString(data){
	const team = data.team.teamName;
	const date = data.date;
	const standups = data.standups;

	var str = 'Ok, here is the stand up for ' + team + ' on ' + date + ': ';
	
	standups.forEach(standup => {
		str += standup.user.firstName + ' said, ' + standup.todayText + '. ' + standup.tomorrowText + '. ';
		str += (standup.blockingText == '' || standup.blockingText == null) ? 
			'Nothing was blocking them. ' : 'Something was blocking them, they said: ' + standup.blockingText + '. ';
	});
	console.log(str);
	return str;
}

module.exports = {

	'playback': async (conv, params) => {
		console.log(conv.user.profile.payload);
		const payload = conv.user.profile.payload;
		const email = payload.email; 
		const date = params.date.substring(0,10);
		console.log(email);
		console.log(date);
		try{
			const rs = await axios.get(backend+'standup/' + date + '/email/' + email);
			if(rs.data[0] == null)
				return conv.ask('There are not any entries for that day');
			console.log(rs.data);
			console.log(rs.data[0]);
			return conv.ask(makePlaybackString(rs.data[0]));
		} catch(error) {
			console.log(error)
			return conv.ask('there was an http error');
		}
	},


};
