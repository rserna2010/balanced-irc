module.exports = function(act) {
	console.log("calling the test script function");

    act.admin_command('bads', function (msg, reply) {
	throw "bad cmd";
    });
};

console.log("---------------------------------- the test script is loaded");
