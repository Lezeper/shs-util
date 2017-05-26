'use strict';
/**
 * Usage:
 * '@moduleUsage' must be the last annotation on the comment
 * must have blank line between multi-line Property
 * start a new line if you want to it be code style
 */
const fs = require('fs');
const jsonfile = require('jsonfile');
const _ = require('lodash');
const glob = require('glob');
const config = require('./config');
const jsonDataFileName = 'data.json';
const charEncording = 'utf-8';
const jsCommentPatern = /\/\*\*([\s\S]*?)\*\//g;
const documentTypes = require('./types');

const writeToJsonFile = (data) => {
	jsonfile.writeFileSync(__dirname + '/' + jsonDataFileName, data);
}

const cleanValue = (val) => {
	return val.replace(/\s\*\s|\*\s|\s\*/g, '');
}

var docList = [];

const setDocJsonData = (processComment, properties, type, filePath) => {
	let tempList = [];
	for (let prop in properties) {
		let val = processComment.match(properties[prop].pattern)[1];
		if (_.isNil(val))
			return console.error('Undeclared document Property: [' + prop + '] on file: ' + filePath);
		
		if(_.isNil(properties[prop].options))
			tempList.push({ key: prop, val: cleanValue(val)});
		else
			tempList.push({ key: prop, val: cleanValue(val), options: properties[prop].options });
	}
	
	return {
		type: type,
		data: tempList
	};
}

const multiDoc = (processComment, properties, type, filePath) => {
	if(processComment.length <= 1)
		return consle.error('multi doc should have at least two document comments.');

	let result = [];
	processComment.forEach((comment) => {
		result = _.concat(result, setDocJsonData(comment, properties, type, filePath));
	});
	return result;
}

const singleDoc = (processComment, properties, type, filePath) => {
	if(processComment.length != 1)
		return consle.error('single doc can only have one document comment.');
	return setDocJsonData(processComment[0], properties, type, filePath);
}

const createDoc = (filePath) => {
	var data = fs.readFileSync(filePath, { encoding : charEncording });

	// extrac all comments(/** ... */) from file
	let commentsInFile = data.match(jsCommentPatern);
	// the comment need to apply regular expression
	let processComment = [];
	let properties = null;
	let type = null;

	for (let i = 0; i < commentsInFile.length; i++) {
		for(let j = 0; j < documentTypes.length; j++) {
			if (commentsInFile[i].indexOf(documentTypes[j].group) > -1) {
				processComment.push(commentsInFile[i]);
				properties = documentTypes[j].properties;
				type = documentTypes[j].type;
				if(documentTypes[j].isSingleDoc)
					break;
			}
		}
	}
	
	if(processComment.length == 0)
		return console.error('No document tag found...');
	else if(processComment.length == 1 && properties != null)
		return singleDoc(processComment, properties, type, filePath);
	else if(processComment.length > 1) {
		return multiDoc(processComment, properties, type, filePath);
	}
}

config.filePath.forEach((fp) => {
	var files = glob.sync(fp);
	files.forEach((file) => {
		var temp = file.split('/');
		var flag = true;
		for(let i = 0; i < config.exclusiveFilesName.length; i++) {
			if(config.exclusiveFilesName[i] == temp[temp.length-1]) {
				flag = false;
				break;
			}
		}
		if(flag) {
			// doc should be single object, or it will need to do some process
			var doc = createDoc(file);
			
			if(!_.isNil(doc)) {
				if(_.isArray(doc)) {
					docList = _.concat(docList, doc);
				} else {
					docList.push(doc);
				}
			}
		}
	});
});

writeToJsonFile(docList);