// files that are getting included for this module

var fs = require('fs');
// maybe have more stuff

module.exports = function(act) {
    // define funcitons here and stuff
    // load anything that is need from the file system

    return; // here just to not enable these commands

    // use this command by pm the bot
    // or doing: bot-name: command-names args
    act.command("command-name", function(msg, reply) {
	// msg is an array of the args, the command name is included
	// think arguments on the command line

	reply("this message is sent in general to the channel");
	reply(true, "this message is directed to the user on the channel");
    });

    // same as act.command but the user must be an admin to use it
    act.admin_command("command-name", function(msg, reply) {

    });

    // gets called on every message
    act.on_message(function(msg, reply) {

    });

    // could be used for debugging/error messages or something when you want to send them over irc
    act.msg_admin("msg to send to the super_admin");


    // when loading files use this as the base dir, should reference the base of the git repo
    act.base_dir
};
