'use strict';
/**
 * Usage:
 * One file must have only one document type
 * '@moduleUsage' must be the last annotation on the comment
 * must have blank line between multi-line Property
 * 
 * TODO:
 * 
 */
const fs = require('fs');
const _ = require('lodash');
const glob = require('glob');
const config = require('./config');
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
const apiPatternGroup = {
	apiName: /@apiName\s+(\w.*)/,
	apiMethod: /@apiMethod\s+(\w.*)/,
	apiUrl: /@apiUrl\s+([\/\w].*)/,
	apiVersion: /@apiVersion\s+(\w.*)/,
	apiGroup: /@apiGroup\s+(\w.*)/,
	apiDescription: /@apiDescription\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,
	apiParam: /@apiParam\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,
	apiParamExample: /@apiParamExample\s+((.|[\r\n])*?(?=\s\*?\s\@|\/))/,
	apiSuccess: /@apiSuccess\s+((.|[\r\n])*?(?=\s\*\s[\r\n\s]))/,
	apiSuccessExample: /@apiSuccessExample\s+((.|[\r\n])*?(?=\s\*?\s\@|\/))/,
};
const documentTypes = [
	{ isSingleDoc: true, type: '@module', patternGroup: modulePatternGroup },
	{ isSingleDoc: true, type: '@mqtt', patternGroup: mqttPatternGroup },
	{ isSingleDoc: false, type: '@api', patternGroup: apiPatternGroup },
];

const multiDoc = (processComment, patternGroup) => {
	// combine pattern will have error here...
	let docList = [];
	processComment.forEach((comment) => {
		for (let prop in patternGroup) {
			let val = comment.match(patternGroup[prop])[1];
			if (_.isNil(val))
				return console.error('Undeclared document Property: [' + prop + '] on file: ' + filePath);
			docList.push({prop: prop, val: val});
		}
	});
	console.log(docList);
}

const singleDoc = (processComment, patternGroup) => {
	// combine pattern will have error here...
	let docList = [];
	for (let prop in patternGroup) {
		let val = processComment[0].match(patternGroup[prop])[1];
		if (_.isNil(val))
			return console.error('Undeclared document Property: [' + prop + '] on file: ' + filePath);
		docList.push({prop: prop, val: val});
	}
	console.log(docList);
}

const createDoc = (filePath) => {
	fs.readFile(filePath, charEncording, (err, data) => {
		if (err) throw err;

		// extrac all comments(/** ... */) from file
		let commentsInFile = data.match(jsCommentPatern);
		// the comment need to apply regular expression
		let processComment = [];
		let patternGroup = null;

		for (let i = 0; i < commentsInFile.length; i++) {
			for(let j = 0; j < documentTypes.length; j++) {
				if (commentsInFile[i].indexOf(documentTypes[j].type) > -1) {
					processComment.push(commentsInFile[i]);
					patternGroup = documentTypes[j].patternGroup;
					if(documentTypes[j].isSingleDoc)
						break;
				}
			}
		}

		if(processComment.length == 0)
			return console.error('No document tag found...');
		else if(processComment.length == 1 && patternGroup != null)
			return singleDoc(processComment, patternGroup);
		else if(processComment.length > 1)
			return multiDoc(processComment, patternGroup);
	});
}

config.filePath.forEach((fp) => {
	glob(fp, {}, function (er, files) {
		files.forEach((file) => {
			var temp = file.split('/');
			var flag = true;
			for(let i = 0; i < config.exclusiveFilesName.length; i++) {
				if(config.exclusiveFilesName[i] == temp[temp.length-1]) {
					flag = false;
					break;
				}
			}
			if(flag)
				createDoc(file);
		});
	});
});