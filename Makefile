.PHONY: js

#######################################
#####            Aide             #####
#######################################
aide:
	@echo "make js		: to compile all js files";
	
js:
	@echo "compilation de main.min.js ..."
	cat js/mootools-core.js js/mootools-more.js js/main.js > js/main.temp.js
	uglifyjs -nm js/main.temp.js > js/main.min.js
	rm js/main.temp.js