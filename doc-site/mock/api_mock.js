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
 * {Object}   searchCriteria1
 * - {String} code
 * - {String} description
 * {String} searchType1			(required) "A", "B", "C" (case insensitive)
 * 
 * @apiParamExample
 * {
 *      "searchCriteria": { "code": "98", "description": "This is description" }
 * }
 * 
 * @apiSuccess { Object } searchResult List of sorted search result index1
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
 * {Object}   searchCriteria
 * - {String} code
 * - {String} description
 * {String} searchType	(required) "A", "B", "C" (case insensitive)
 * 
 * @apiParamExample
 * {
 *      "searchCriteria": { "code": "98", "description": "This is description" }
 * }
 * 
 * @apiSuccess { Object } searchResult List of sorted search result index
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