const axios = require('axios');
const backend = 'http://capstone-env.ruehm2cvrs.us-east-2.elasticbeanstalk.com/'

module.exports = {

	'post-test': async (conv) => {
		const rs = await axios.get(backend + 'entry/9')
			.then(function (response) {
				console.log(response.data);
				console.log('one');
				axios.post(backend + 'entry', response.data)
					.then(function (response) {
						console.log(response);
						console.log('two');
						return conv.ask("swell");
					})
					.catch(function(error) {
						console.log(error);
						console.log('three');
						return conv.ask("yikes");
					});
			})
			.catch(function(error) {
				console.log(error);
				console.log('four');
				return conv.ask("big yikes");
			});
	},


};
