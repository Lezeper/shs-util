# SHA Util Kit
This is a util kit for my SHA project. Modular oriented and extendable.

## Modules
### Doc-Site
Dynamically generate documentation web site and template files using just one-line command line.
All the developer need to do is wrote document comment on the file. It will automatically find
out those comment and make up a documentation web site.
#### Usage Example
```node doc-site g web```    - generate documentation website

```node doc-site g module```  -  create a template module file
#### Comment format Example
```
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
 Some code goes here... (first level comment)
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
 function code goes here... (second level comment)
```
### To be continue...
