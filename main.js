// some global variables

config = require('./config');
brain = {};

var assert = require('assert');

// loading the "brain"
var fs = require('fs');
try {
    brain = JSON.parse(fs.readFileSync(config.save_file).toString());
} catch(e) {
    brain = {
	admins: [ config.admin_super ],
    }
}

setInterval(function () {
    fs.writeFile(config.save_file, JSON.stringify(brain, null, " "), function(err, result) {
	if(err) {
	    console.error("There was a problem saving the brain");
	    client.say(config.admin_super, "There was a problem saving the brain");
	}
    });
}, config.save_inveral);


var client; // use for the irc client

// object containing
var file_commands = {};


var admin_commands = {
    "add-admin": function(msg, reply) {
	if(brain.admins.indexOf(msg[1]) != -1) {
	    reply("Admin already on the list");
	}
    },
    "delete-admin": function(msg, reply) {
	if(msg[1] == config.admin_super) {
	    reply("Can not delete the super admin");
	    return;
	}
	var index = brain.admins.indexOf(msg[1]);
	if(index == -1) {
	    reply("Admin not found");
	}else{
	    brain.admins.splice(index, 1);
	    reply("admin deleted");
	}
    },
    "list-files": function (msg, reply) {
	reply(scripts_names.join(", "));
    },
    "reload-file": function(msg, reply) {
	require.cache = {}; // make sure we are reloading the cache
	reply(load_command(msg[0]) ? msg[0] + " was reloaded" : msg[0] + " failed to reload");
    },
    "reload-all": function(msg, reply) {
	load_commands();
	reply("reloading all commands");
    }
};

var commands = {
    "list-admin": function(msg, reply) {
	reply(brain.admins.join(", "));
    },
    "help": function(msg, reply) {
	var list = [];
	for(var a in commands)
	    list.push(a);
	reply(true, list.join(', '));
    }
};

var message_actions = {};

function load_action(module_name) {
    message_actions[module_name] = [];
    return {
	admin_command: function(name, fun) {
	    name = name.toLowerCase();
	    admin_commands[name] = fun;
	},
	command: function(name, fun) {
	    name = name.toLowerCase();
	    commands[name] = fun;
	},
	on_message: function(fun) {
	    message_actions[module_name].push(fun);
	},
	msg_admin: function(msg) {
	    client.say(config.admin_super, msg);
	},
	msg: function(who, msg) {
	    client.say(who, msg);
	}

    };
}

// load the files and stuff





function run_command(from, msg, info, pm) {
    function reply (msg, msg2) {
	console.log("bot saying:", msg);
	if(msg === true) {
	    if(pm === true)
		msg = msg2;
	    else
		msg = info.nick + ": " + msg2;
	}
	client.say(from, msg);
    }
    var is_admin = brain.admins.indexOf(info.nick) != -1;
    info.from = from;
    assert(typeof msg == "string");
    msg = msg.split(" ");
    if(msg[0].indexOf(config.nick) != -1) {
	msg.shift(); // remove the bot name from the msg
    }
    for(var a=0; a < msg.length; a++) {
	if(commands[msg[a]]) {
	    return false === commands[msg[a]](msg, reply, info);
	}
	if(is_admin && admin_commands[msg[a]]) {
	    return false === admin_commands[msg[a]](msg, reply, info);
	}
    }
    client.say(from, "Command not found");
    return false;
}

function on_message(from, msg, info) {
    function reply(msg, msg2) {
	if(msg === true) {
	    msg = info.nick + ": " + msg2;
	}
	client.say(from, msg);
    }
    for(var name in message_actions) {
	for(var a=0; a < message_actions[name].length; a++) {
	    message_actions[name][a](msg, reply, info);
	}
    }
}

var scripts_names = [];

function load_command (name) {
    try {
	console.log("Loading script", name);
	scripts_names.push(name);
	var fn = require('./scripts/'+name);
	fn(load_action(name));
	return true;
    }catch(e) {
	console.error("Failed to load", name, e);
	return false;
    }
}

function load_commands () {
    require.cache = {}; // make sure we are reloading the cache
    fs.readdir(__dirname + '/scripts/', function(err, results) {
	for(var a =0; a < results.length; a++) {
	    load_command(results[a].split('.')[0]);
	}
    });
}


load_commands();

function start_irc () {
    var irc = require('irc');

    client = new irc.Client(config.server, config.nick, {
	channels: config.channels
    });

    client.on('error', console.error);

    client.on('message', function(nick, from, message, info) {
	console.log("message", message);
	if(message.indexOf(config.nick) != -1) {
	    console.log("trying to run a command");
	    if(!run_command(from, message, info)) {
		on_message(from, message, info);
	    }
	}else{
	    on_message(from, message, info);
	}
	console.log("message:", message, arguments);
    });

    client.on('pm', function(nick, message, info) {
	run_command(nick, message, info, true);
	console.log("pm:", arguments);
    });

}

if(!process.env.NO_CONNECT) {
    start_irc();
}

console.log('running');
