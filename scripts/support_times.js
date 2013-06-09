var match_words = /problem|question|help|hello|hi|issue|support|around|anyone|here|how.*do/i;

var help_message = "fyi: This channel is manned Monday through Friday 9 to 7 PST, if there is no one around you can always come back and ask your questions or email support@balancedpayments.com and we will get back to you";

module.exports = function(act) {
    var timer = null;
    act.on_message(function(msg, reply) {
	if(match_words.exec(msg.join(' '))) {
	    var day = (new Date).getDay();
	    var hour = (new Date).getHours();
	    if(!(day == 6 || day == 0 || hour < 9 || hour >= 19)) return; // this channel should be manned
	    if(timer) return;
	    timer = setTimeout(function () {
		reply(true, help_message);
		timer = null;
	    }, 90 * 1000);
	}else{
	    if(timer)
		clearTimeout(timer);
	}
    });
};
