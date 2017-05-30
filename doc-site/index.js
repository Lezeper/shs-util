'use strict';
/**
 * @moduleName Doc-Site
 * @moduleVersion 1.0.0
 * @moduleGroup Util
 * @moduleDescription
 * Dynamically generate document web site and template files. 
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
 */
const fs = require('fs');
const jsonfile = require('jsonfile');
const _ = require('lodash');
const glob = require('glob');
const config = require('./config');
const jsonDataFileName = 'data.json';
const charEncording = 'utf-8';
const jsCommentPatern = /\/\*\*([\s\S]*?)\*\//g;
const documentTypes = require('./template');

const writeToJsonFile = (data) => {
	jsonfile.writeFileSync(__dirname + '/' + jsonDataFileName, data);
}

const cleanValue = (val) => {
	return _.isNil(val) || _.isEmpty(val) ? null : val.replace(/\s\*\s|\*\s|\s\*/g, '');
}

var docList = [];

const setDocJsonData = (processComment, properties, type, filePath) => {
	let tempList = [];
	for (let prop in properties) {
		let temp = processComment.match(properties[prop].pattern);
		let val = _.isNil(temp) ? null : temp[1];
		if (_.isNil(val) && properties[prop].required)
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

	if(!_.isNil(commentsInFile)) {
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
	}

	if(processComment.length == 0)
		return console.error('No document tag found on file '+filePath+'...');
	else if(processComment.length == 1 && properties != null)
		return singleDoc(processComment, properties, type, filePath);
	else if(processComment.length > 1) {
		return multiDoc(processComment, properties, type, filePath);
	}
}

const generate = (type, fileRelativePath) => {
	if(type === 'web') {
		config.filePath.forEach((fp) => {
			var files = glob.sync(fp);
			console.log(files)
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
