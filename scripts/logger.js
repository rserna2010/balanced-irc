var fs = require('fs');

// make a global variable to surive reloads
try {
    log_fs_desc = log_fs_desc;
} catch(e) {
    log_fs_desc = false;
}

module.exports = function (act) {
    if(log_fs_desc === false) {
	fs.open(config.log_file, 'a', function(err, fs_desc) {
	    if(err) {
		console.error("Problem opening the log file");
	    }
	    log_fs_desc = fs_desc;
	});
    }
    act.on_message(function (msg, reply, info) {
	if(log_fs_desc) {
	    var buf = new Buffer(JSON.stringify(info)+"\n");
	    fs.write(log_fs_desc, buf, 0, buf.length, null, function(err) {
		if(err) {
		    console.error("Problem writing to log file");
		    act.msg_admin("Problem writing to log file");
		}
	    });
	}
    });
};
