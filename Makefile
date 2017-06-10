prebuild:
	yarn
	cd functions && yarn && cd ..

build:
	node_modules/.bin/webpack --config webpack.prod.config.js --progress -p

deploy:
	firebase deploy --token "$(TOKEN)"

cleanup:
	find (*|.*) -maxdepth 0 -not -name '.env' -not -name '.git' -not -name 'node_modules' -exec rm -R {} \;
