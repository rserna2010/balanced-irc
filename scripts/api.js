
var fs = require('fs');



module.exports = function(act) {
    var api_files = {};
    function load_file(path, name) {
	fs.readFile(path, function(err, result) {
	    console.log("api load file:", path);
	    api_files[name] = result.toString();

	});
    }
    for(var a =0; a < config.api_path.length; a++) {
	var list = fs.readdirSync(config.api_path[a]);
	for(var b = 0; b < list.length; b++) {
	    load_file(config.api_path[a] + '/' + list[b], list[b]);
	}
    }

    var api_indexs = {};
    function build_index(name) {
	var regex = /\n(.*)\n-*\n/g;

	//api_files
    }

    act.command("api", function(msg, reply) {

    });

};
