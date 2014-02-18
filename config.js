exports.server = "irc.freenode.net";
exports.nick = "richie-bot";

// add more admins by running
exports.admin_super = "ras__"; // gets a pm when there is an error

exports.channels = [ "#rserna2010", "##rserna2010" ];


exports.save_file = "/tmp/brain-dump.json"
exports.save_inveral = 5 * 1000; // 5 seconds


// config for scripts

exports.faq_path = [ "resources/balanced-docs/faq/Developer Support/Developer FAQ",
		     "resources/balanced-docs/faq/General Support/General FAQs",
		     "resources/balanced-docs/faq/General Support/Support for folks who do support"
		   ];


exports.api_path = [ "resources/balanced-docs/spec/src/resources" ];

exports.log_file = "/tmp/irc-log.json2"
