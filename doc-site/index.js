'use strict';
/**
 * @moduleName Doc-Site
 * @moduleVersion 1.0.0
 * @moduleGroup Util
 * @moduleDescription
 * Dynamically generate document web site and template files.
 * Have default types: API, MQTT and Module.
 * 
 * @moduleUsage
 * Generate template file: node doc-site g module myDir/test.js
 * Generate document website: node doc-site g web
 * ~
 * For adding new Type:
 * add to template/index.js and add new template file
 * 
 * @moduleWarning
 * don't leave a new line within the contents.
 * same property name is allowed, but should next to each other, and should not be the final property.
 */
const fs = require('fs');
const jsonfile = require('jsonfile');
const _ = require('lodash');
const glob = require('glob');
const config = require('./config');
const jsonDataFileName = 'data.json';
const charEncording = 'utf-8';
const jsCommentPatern = /\/\*\*([\s\S]*?)\*\//g;
const DocumentTypes = require('./template');
const documentTypes = DocumentTypes.TYPES;
const JSON_ = DocumentTypes.JSON;

const writeToJsonFile = (data) => {
	jsonfile.writeFileSync(__dirname + '/' + jsonDataFileName, data);
}

const cleanValue = (val, propertyName) => {
	let pattern = (_.isNil(propertyName) || _.isEmpty(propertyName))
		? new RegExp('\\s\\*\\s|\\*\\s|\\s\\*', 'g') : new RegExp('\\s\\*\\s|\\*\\s|\\s\\*|'+propertyName, 'g');

	let matchedStr = val.match(pattern);
	let isMultiFound = false;
	if(!_.isNil(matchedStr)) {
		isMultiFound = val.match(pattern).indexOf(propertyName) > -1;
	}
	return _.isNil(val) || _.isEmpty(val) ? null : {val: val.replace(pattern, ''), isMultiFound: isMultiFound};
}

var docList = [];

const setDocJsonData = (processComment, properties, type, filePath) => {
	let tempList = [];
	
	for (let prop in properties) {
		let temp = processComment.match(properties[prop].pattern);
		temp = _.isNil(temp) ? null : temp[1];
		if (_.isNil(temp) && properties[prop].required)
			return console.error('Undeclared document Property: [' + properties[prop].propertyName + '] on file: ' + filePath);

		if(!_.isNil(temp)) {
				let cleanVal = cleanValue(temp, properties[prop].propertyName);
				// need to consider there are multiple same properties
				if(properties[prop].isMulti) {
					if(properties[prop].type === JSON_) {
						if(cleanVal.isMultiFound) {
							let cleanValSplit = cleanVal.val.split("\n");
							let valueList = [];
							cleanValSplit.forEach((t)=>{
								try {
									let validJSON = JSON.parse(t);
									valueList.push(validJSON)
								} catch(e){}
							});
							tempList.push({ key: prop, val: valueList, type: properties[prop].type, options: properties[prop].options });
						} else {
							tempList.push({ key: prop, val: cleanVal.val, type: properties[prop].type, options: properties[prop].options });
					}
				}
			} else {
				tempList.push({ key: prop, val: cleanVal.val, type: properties[prop].type, options: properties[prop].options});
			}
		}
	}
	// multiple comment and it is sub group
	if(_.isNil(type)) {
		return tempList;
	}

	return {
		type: type,
		hasSub: false,
		data: tempList
	};
}

const multiCommentWithSub = (processComments, properties, type, filePath, subDocProperties, subGroup) => {
	if(processComments.length <= 1 || _.isNil(subDocProperties) || _.isNil(subGroup))
		return console.error('Invalid params for multiCommentWithSub.');
	
	let result = { type: type, hasSub: true, data: { main: null, sub: [] } };
	processComments.forEach((comment) => {
		if(comment.indexOf(subGroup) > -1) {
			result.data.sub = _.concat(result.data.sub, setDocJsonData(comment, subDocProperties, null, filePath));
		} else {
			if(result.data.main != null)
				return console.error('mutiple main comment found on file: ' + filePath);
			result.data.main = setDocJsonData(comment, properties, null, filePath);
		}
	});
	return result;
}

const multiComment = (processComments, properties, type, filePath) => {
	if(processComments.length <= 1)
		return consle.error('multi doc should have at least two document comments.');

	let result = [];
	processComments.forEach(function(comment) {
		result.push(setDocJsonData(comment, properties, type, filePath));
	});
	return result;
}

const singleComment = (processComments, properties, type, filePath) => {
	if(processComments.length != 1)
		return consle.error('single doc can only have one document comment.');
	return setDocJsonData(processComments[0], properties, type, filePath);
}

const createDoc = (filePath) => {
	var data = fs.readFileSync(filePath, { encoding : charEncording });

	// extrac all comments(/** ... */) from file
	let commentsInFile = data.match(jsCommentPatern);
	// the comment need to apply regular expression
	let processComments = [];
	let properties = null;
	let subDocProperties = null;
	let subGroup = null;
	let type = null;
	
	if(!_.isNil(commentsInFile)) {
		for (let i = 0; i < commentsInFile.length; i++) {
			for(let j = 0; j < documentTypes.length; j++) {
				if (commentsInFile[i].indexOf(documentTypes[j].group) > -1) {
					processComments.push(commentsInFile[i]);
					properties = documentTypes[j].properties;
					subDocProperties = documentTypes[j].subDocProperties;
					subGroup = documentTypes[j].subGroup;
					type = documentTypes[j].type;
					if(documentTypes[j].isSingleDoc && _.isNil(documentTypes[j].subDocProperties))
						break;
				}
			}
		}
	}

	if(processComments.length == 0)
		return console.error('No document tag found on file '+filePath+'...');
	else if(processComments.length == 1 && properties != null)
		return singleComment(processComments, properties, type, filePath);
	else if(processComments.length > 1) {
		if(_.isNil(subGroup)) {
			return multiComment(processComments, properties, type, filePath);
		}
		return multiCommentWithSub(processComments, properties, type, filePath, subDocProperties, subGroup);
	}
}

const generate = (type, fileRelativePath) => {
	if(type === 'web') {
		config.scanPath.forEach((fp) => {
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
	} else {
		// generate template file
		for(let i = 0; i < documentTypes.length; i++) {
			if(documentTypes[i].type === type) {
				let tempData = fs.readFileSync(documentTypes[i].templateFilePath, { encoding : charEncording });
				return fs.writeFileSync(process.cwd() + '/' + fileRelativePath, tempData);
			}
		}
		// the template file is not found
		console.error('template file not found...');
	}
}

if(process.argv.length == 4 || process.argv.length == 5) {
	// console.log(process.cwd())
	var operation = null;
	var type = null;
	var fileRelativePath = null; // e.g test.js or myDir/test.js
	process.argv.forEach((val, index) => {
		if(index == 2)
			operation = val;
		else if(index == 3)
			type = val;
		else if(index == 4)
			fileRelativePath = val;
	});
	if(operation === 'g') {
		if(type === 'web') {
			generate(type);
		} else {
			if(fileRelativePath !=null)
				generate(type, fileRelativePath);
			else
				console.error('fileRelativePath is not given for generate file type: '+type+'...');
		}
	}
} else {
	console.error('Invalid argument...');
}
