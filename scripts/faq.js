var fs = require('fs');

//var pagedown = require('pagedown');

module.exports = function (act) {
    console.log("--------- faq function called");
    var faq_list = {};
    function load_file(path) {
	fs.readFile(path, function (err, contents) {
	    console.log("faq loading:", path);
	    faq_list[path] = contents.toString();
	});
    }
    for(var a=0; a < config.faq_path.length; a++) {
	var list = fs.readdirSync(act.base_dir + '/' + config.faq_path[a]);
	for(var b = 0; b < list.length; b++) {
	    var path = act.base_dir + '/' + config.faq_path[a] + '/' + list[b];
	    load_file(path);
	}
    }
    //console.log(act.base_dir);

    //var converter = pagedown.getSanitizingConverter();

    act.command('faq', function(msg, reply) {
	console.log("faq msg:", msg);
	var f_index = msg.indexOf('faq');
	if(f_index != -1) msg.splice(f_index, 1);
	console.log(faq_list);
	for(var name in faq_list) {
	    console.log("looking at: ", name, msg);
	    var a;
	    for(a=0; a < msg.length; a++) {
		if(faq_list[name].toLowerCase().indexOf(msg[a].toLowerCase()) == -1)
		    break;
	    }
	    // it found all the key words
	    if(a == msg.length) {
		console.log("sending", faq_list[name]);
		var arr = faq_list[name].split('---');
		reply(arr[arr.length-1]);
		return;
	    }
	}
	console.log("did not find faq");
	reply(true, "did not find a faq with those terms");
    });
};


console.log("--------------------- faq loaded");
