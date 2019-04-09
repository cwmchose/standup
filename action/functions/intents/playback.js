//
//
// intent fulfillment for create
//
//
const axios = require('axios');
const backend = 'http://capstone-env.ruehm2cvrs.us-east-2.elasticbeanstalk.com/'
const app = require('../app');

async function playback(conv, params)  {
	console.log(conv.user.profile.payload);
	const payload = conv.user.profile.payload;
	const email = payload.email; 
	const date = params.date.substring(0,10);
	console.log(email);
	console.log(date);
	try{
		const rs = await axios.get(backend+'entry/' + date + '/' + email);
		console.log(rs.data);
		console.log(rs.data[0].data);
		return conv.ask(rs.data[0].data);
	} catch(error) {
		console.log(error)
		return conv.ask('there was an http error');
	}
}
module.exports = {

  'playback': playback   ,


};
