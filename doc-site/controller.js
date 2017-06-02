const app = angular.module('app', ['ngSanitize', 'hljs', 'mgcrea.ngStrap']);

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

	const getPropertyValue = (value, type) => {
		if(type === 'string') {
			return value;
		} else if(type === 'json') {
			let tableHead = '';
			let tableBody = '';
			if(_.isArray(value)) {
				let propertyNameList = [];
				value.forEach(function(val) {
					propertyNameList = _.concat(propertyNameList, Object.keys(val));
				});
				let tableHeadProperties = new Set(propertyNameList);
				value.forEach(function(val, index) {
					let tableRow = '';
					tableHeadProperties.forEach((thp) => {
						tableRow += ('<td>' + val[thp] + '</td>');
						if(index == 0) {
							tableHead += ('<th>' + thp + '</th>');
						}
					});
					tableBody += ('<tr>' + tableRow + '</tr>');
				});
			} else {
				let obj = JSON.parse(value);
				for(let propName in obj) {
					tableHead += ('<th>' + propName + '</th>');
					tableBody += ('<td>' + obj[propName] + '</td>');
				}
			}
			return '<table class=\"table\"><thead>' + tableHead + '</thead>'+ '<tbody>' + tableBody + '</tbody>' + '</table>'
		}
	}

	const generateHTML = (props, isSub) => {
		let result = '';
		props.forEach((prop, index) => {
			if(prop.key.substring(0,1) != '$' && prop.key.substring(0,2) != '$$') {
				if(index == 0 && !isSub) {
					result += ("<h3 class='title-badget'>" + getPropertyValue(prop.val, prop.type) + '</h3>');
				} else {
					if(_.isNil(prop.options)) {
						result += ('<strong>' + prop.key + ': ' + '</strong> ' + getPropertyValue(prop.val, prop.type) + '\n');
					} else {
						if(prop.options.isCode) {
							result += ("<div><strong>" + prop.key + ': ' + "</strong><div hljs>" + getPropertyValue(prop.val, prop.type) + '</div></div>');
						} else if(prop.options.isWarning && !_.isEmpty(prop.val)) {
							result += ("<div class='doc-warning'><h4>Warning</h4>" + getPropertyValue(prop.val, prop.type) +"</div>");
						}
					}
				}
			}
		});
		return result;
	}

	app.filter('docObjConverter', function() {
		return function(doc) {
			let props = doc.data;

			if(doc.hasSub) {
				let mainPart = generateHTML(props.main, false);
				let subPart = generateHTML(props.sub, true);
				return mainPart + '<br>' + subPart;
			} else {
				return generateHTML(props, false);
			}
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
						tempList[index].dataList.push(doc);
					} else {
						let data;
						if(!doc.hasSub) {
							data = {
								type: doc.type,
								titleList: [doc.data[0].val],
								dataList: [doc]
							}
						} else {
							data = {
								type: doc.type,
								titleList: [doc.data.main[0].val],
								dataList: [doc]
							}
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