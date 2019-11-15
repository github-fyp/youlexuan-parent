app.controller('loginController',function ($scope,loginService) {
    $scope.getName = function () {
        loginService.getName().success(function (resp) {
            $scope.sellerId = resp.sellerId;
            $scope.logintime = resp.logintime;
        });
    }
});