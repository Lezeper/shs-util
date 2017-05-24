'use strict';
/** eslint eqeqeq:0
 * 
 */
/**
 * @otherTag
 */
/**
 * @moduleName Module Test (It should have only one line)
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