This is a basic irc client

All of the base functions are in the main.js file, 


decided to not use hubot as hubot seems to simply give a basic interface around the irc client that really only added filtering using regex and did not make it easy to expand with non regex comands

starting up:
	git clone https://github.com/matthewfl/balanced-irc.git
	cd balanced-irc
	git submodule update --init --recursive
	npm install
	node main.js


config notes:
	edit config.js

	save_file is where the working dataset gets save

	admin_super is the master admin, that also gets a message any time there is an error with the bot




TODO:
	make the readme nice
