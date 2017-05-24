/**
 * @apiName resultIndex
 * @apiMethod post
 * @apiUrl /Product/resultIndex
 * @apiVersion 1.0.0
 * @apiGroup Product
 * 
 * @apiDescription  Retrieves a list of sorted search result index
 * 
 * @apiParam {Object}   searchCriteria
 * 	- {String} code
 * 	- {String} description
 * @apiParam {String} searchType			(required) "A", "B", "C" (case insensitive)
 * @apiParamExample
 * {
 *      "searchCriteria": { "code": "98", "description": "This is description" }
 * }
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