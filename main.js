(function(){
    var app = angular.module('app', []);
    app.controller('mainCtrl', function($scope){
        $scope.test = 1;
        $scope.click = function() {
            window.open("doc-site/index.html");
        }
    });
})();