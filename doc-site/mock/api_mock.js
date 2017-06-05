function assembleTokens(req, res, customTokens) {
  const arrayUniqueTokens = (array) => {
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
          // not === because token can be regexp object
          /* eslint eqeqeq:0 */
        if (a[i].token == a[j].token) {
          a.splice(j--, 1);
        }
      }
    }
    return a;
  };
/**
 * @apiName resultIndex1
 * @apiMethod post1
 * @apiUrl /Product/resultIndex1
 * @apiVersion 1.0.01
 * @apiGroup Product1
 * 
 * @apiDescription  Retrieves a list of sorted search result index1
 * 
 * @apiParam 
 * { "param": "searchCriteria1", "type": "Object", "description": "ABC" }
 * @apiParam 
 * { "param": "- code", "type": "String", "description": "this is code" }
 * @apiParam 
 * { "param": "- description", "type": "String", "isRequired": "true", "description": "this is description" }
 * 
 * @apiParamExample
 * {
 *      "searchCriteria": { "code": "98", "description": "This is description" }
 * }
 * 
 * @apiSuccess 
 * { Object } searchResult List of sorted search result index1
 * 
 * @apiSuccessExample
 * [
 *  {
 *      "id": "12345"
 *  },
 *  {
 *      "id": "67890"
 *  }
 * ]
 */
function assembleTokens(req, res, customTokens) {
  const arrayUniqueTokens = (array) => {
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
          // not === because token can be regexp object
          /* eslint eqeqeq:0 */
        if (a[i].token == a[j].token) {
          a.splice(j--, 1);
        }
      }
    }
    return a;
  };
/**
 * @apiName resultIndex
 * @apiMethod post1
 * @apiUrl /Product/resultIndex
 * @apiVersion 1.0.0
 * @apiGroup Product
 * 
 * @apiDescription  Retrieves a list of sorted search result index
 * 
 * @apiParam 
 * { "param": "searchCriteria1", "type": "Object", "description": "ABC" }
 * @apiParam 
 * { "param": "- code", "type": "String", "description": "this is code" }
 * @apiParam 
 * { "param": "- description", "type": "String", "description": "this is description" }
 * 
 * @apiParamExample
 * {
 *      "searchCriteria": { "code": "98", "description": "This is description" }
 * }
 * 
 * @apiSuccess 
 * { Object } searchResult List of sorted search result index
 * 
 * @apiSuccessExample 
 * [
 *  {
 *      "id": "12345"
 *  },
 *  {
 *      "id": "67890"
 *  }
 * ]
 */
function assembleTokens(req, res, customTokens) {
  const arrayUniqueTokens = (array) => {
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
          // not === because token can be regexp object
          /* eslint eqeqeq:0 */
        if (a[i].token == a[j].token) {
          a.splice(j--, 1);
        }
      }
    }
    return a;
  };