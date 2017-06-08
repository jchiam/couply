prebuild:
	yarn
	cd functions && yarn && cd ..

build:
	node_modules/.bin/webpack --config webpack.prod.config.js --progress -p

deploy:
	firebase deploy --token "$FIREBASE_TOKEN"
