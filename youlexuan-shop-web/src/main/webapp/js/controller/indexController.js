app.controller('indexController',function ($scope,indexService) {
    $scope.getName = function () {
        indexService.getName().success(function (resp) {
            $scope.name = resp.name;
        });
    }
});