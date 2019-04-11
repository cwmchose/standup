function prepCapabilities(conv, data){
	if(conv.hasScreen && data.visual != null)
		conv.ask(visual);

}

function encodeEntry(entry){
	var toUser = {
		speech: "",
		text: "",
		visual: ""
	}
	var str = 'Here is the stand up you asked for:\n ';
	str += entry.todayText + '.\n ' + entry.tomorrowText + '.\n ';
	str += (entry.blockingText == null || entry.blockingText == '') ?
			' Nothing was blocking you.' :  'Something was blocking you. You said:\n ' + entry.blockingText;
	str += ".\n";

	var ssml = '<speak>Here is the stand up you asked for <break time="2" /> ' ; 
	ssml += '<s>' + entry.todayText + '</s><s> ' + entry.tomorrowText + '</s><s>';
	ssml += (entry.blockingText == null || entry.blockingText == '') ?
			'Nothing was blocking you.' :  'Something was blocking you.</s><s> You said: ' + entry.blockingText;
	ssml += ".</s>";
	
	ssml += '</speak>'

	var visual = "";

	toUser.speech = ssml;
	toUser.text = str;
	toUser.visual = visual;
	return toUser;
}

function encodeStandup(standup){

}

module.exports = {
	'encodeEntry' : encodeEntry,
}
