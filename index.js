/**
 * Usage:
 * One file must have only one Module Documentation
 * '@moduleUsage' must be the last annotation on the comment
 */
'use strict';

const fs = require('fs');
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

const extractDoc = (filePath, documentType) => {
    fs.readFile(filePath, charEncording, (err, data) => {
        if(err) throw err;
        
        // extrac all comments(/** */) from file
        let commentsInFile = data.match(jsCommentPatern);
        // the comment need to apply regular expression
        let processComment = [];

        for(let i = 0; i < commentsInFile.length; i++) {
            if(commentsInFile[i].indexOf(documentType) > -1)
                processComment.push(commentsInFile[i]);
        }
        
        if(documentType == '@module') {
            if(processComment.length != 1) {
                return console.error('No module document or more than one module document found...');
            }
            else {
                // combine pattern will have error here...
                let moduleMap = new Map();
                for(let prop in modulePatternGroup) {
                    moduleMap.set(prop, processComment[0].match(modulePatternGroup[prop])[1]);
                }
                console.log(moduleMap)
            }
        }
    });
}

extractDoc('module_mock.js', '@module');
