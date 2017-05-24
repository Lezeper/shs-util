/**
 * Usage:
 * One file must have only one Module Documentation or MQTT Client
 * '@moduleUsage' must be the last annotation on the comment
 */
'use strict';

const fs = require('fs');
const _ = require('lodash');
const charEncording = 'utf-8';
const jsCommentPatern = /\/\*\*([\s\S]*?)\*\//g;
const modulePatternGroup = {
	moduleName: /@moduleName\s+(\w.*)/,
	moduleVersion: /@moduleVersion\s+(\w.*)/,
	moduleGroup: /@moduleGroup\s+(\w.*)/,
	moduleDescription: /@moduleDescription\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,
	moduleDependency: /@moduleDependency\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,
	moduleUsage: /@moduleUsage\s+((.|[\n\r])*?(?=\s\*\/))/,
};
const mqttPatternGroup = {
	mqttClientId: /@mqttClientId\s+(\w.*)/,
	mqttClientVersion: /@mqttClientVersion\s+(\w.*)/,
	mqttBrokerUrl: /@mqttBrokerUrl\s+([\/\w].*)/,
	mqttDescription: /@mqttDescription\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,	
	mqttSubscribe: /@mqttSubscribe\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,
	mqttPublish: /@mqttPublish\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,
};

const singleDoc = (processComment, patternGroup) => {
	if (processComment.length != 1) {
		return console.error('No document or more than one document found...');
	}
	else {
		// combine pattern will have error here...
		let docMap = new Map();
		for (let prop in patternGroup) {
			let val = processComment[0].match(patternGroup[prop])[1];
			if (_.isNil(val))
				return console.error('Undeclared document Property: [' + prop + '] on file: ' + filePath);
			docMap.set(prop, val);
		}
		console.log(docMap)
	}
}

const createDoc = (filePath, documentType) => {
	fs.readFile(filePath, charEncording, (err, data) => {
		if (err) throw err;

		// extrac all comments(/** */) from file
		let commentsInFile = data.match(jsCommentPatern);
		// the comment need to apply regular expression
		let processComment = [];

		for (let i = 0; i < commentsInFile.length; i++) {
			if (commentsInFile[i].indexOf(documentType) > -1)
				processComment.push(commentsInFile[i]);
		}

		switch (documentType) {
			case '@module':
				return singleDoc(processComment, modulePatternGroup);
			case '@mqtt':
				return singleDoc(processComment, mqttPatternGroup);
		}
	});
}

createDoc('module_mock.js', '@module');
createDoc('mqtt_mock.js', '@mqtt');
