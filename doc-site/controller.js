const app = angular.module('app', ['ngSanitize', 'hljs']);

{
	app.directive('bindHtmlCompile', ['$compile', function ($compile) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				scope.$watch(function () {
					return scope.$eval(attrs.bindHtmlCompile);
				}, function (value) {
					element.html(value && value.toString());
					var compileScope = scope;
					if (attrs.bindHtmlScope) {
						compileScope = scope.$eval(attrs.bindHtmlScope);
					}
					$compile(element.contents())(compileScope);
				});
			}
		};
	}]);

	app.filter('docObjConverter', function() {
		return function(props) {
			let result = '';
			props.forEach((prop, index) => {
				if(prop.key.substring(0,1) != '$' && prop.key.substring(0,2) != '$$') {
					if(index == 0) {
						result += ("<h3 class='title-badget'>" + prop.val + '</h3>');
					} else {
						if(_.isNil(prop.options)) {
							result += ('<strong>' + prop.key + ': ' + '</strong> ' + prop.val + '\n');
						} else {
							if(prop.options.isCode) {
								result += ("<div><strong>" + prop.key + ': ' + "</strong><div hljs>" + prop.val + '</div></div>');
							}
						}
					}
				}
			});
			return result;
		}
	});

	app.controller('mainCtrl', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
		const _this = this;
		_this.jsonFile = 'data.json';
		_this.docList = [];

		_this.readJsonData = () => {
			$http.get(_this.jsonFile).then((dl) => {
				let tempList = [];
				dl.data.forEach((doc) => {
					let index = _.findIndex(tempList, (o) => { return o.type == doc.type; });
					if(tempList.length > 0 && index > -1){
						tempList[index].titleList.push(doc.data[0].val);
						tempList[index].dataList.push(doc.data);
					} else {
						let data = {
							type: doc.type,
							titleList: [doc.data[0].val],
							dataList: [doc.data]
						}
						tempList.push(data);
					}
				});
				_this.docList = tempList;
			});
		}

		_this.readJsonData();
	}]);
};