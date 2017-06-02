'use strict';
/**
 * @moduleName Module Test
 * 
 * @moduleVersion 1.0.0 (It should have only one line)
 * @moduleGroup Utility (It should have only one line)
 * 
 * @moduleDescription  This is a module.
 * It would have multiple lines.
 * 
 * @moduleDependency  Logger, etc...
 * It may have multiple lines.
 * 
 * @moduleUsage
 * const module = require('...');
 * // start a server
 * module.start();
 */
function assembleTokens(req, res, customTokens) {
  const arrayUniqueTokens = (array) => {
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
          // not === because token can be regexp object

        if (a[i].token == a[j].token) {
          a.splice(j--, 1);
        }
      }
    }
	/* eslint eqeqeq:0 */
    return a;
  };
}
/**
 * @moduleApiName assembleTokens
 * @moduleApiReturns array object
 * 
 * @moduleApiParam
 * { "param": "req", "type": "Object", "description": "the request from client" }
 * @moduleApiParam
 * { "param": "res", "type": "Object", "description": "the response back to client" }
 * 
 * @moduleApiExample
 * let a = assembleTokens(req, res);
 * console.log(a);
 */
function assembleTokens(req, res, customTokens) {
  const arrayUniqueTokens = (array) => {
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      // not === because token can be regexp object
    }
	/* eslint eqeqeq:0 */
    return a;
  };
}

/**
 * @moduleApiName assembleTokens2
 * @moduleApiReturns array object2
 * @moduleApiParam
 * { "param": "req", "type": "Object2", "description": "the request from client" }
 * 
 * @moduleApiExample
 * let a = assembleTokens(req2, res);
 */
function assembleTokens2(req, res, customTokens) {
  const arrayUniqueTokens = (array) => {
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      // not === because token can be regexp object
    }
	/* eslint eqeqeq:0 */
    return a;
  };
}