app.controller('userController',function ($scope,userService,$controller) {

    $controller('baseController',{$scope:$scope});

    $scope.delete = function(){

        //判断
        if($scope.seleceIds == null || $scope.seleceIds.length<=0){
            alert("请选择后再删除");
            return;
        }

        // $http.get('/usercenter/delete.do?ids='+ $scope.seleceIds).success(function (resp) {
        userService.delete($scope.seleceIds).success(function (resp) {
            if(resp.success){
                $scope.reloadList();
                $scope.seleceIds = [];
            }else{
                alert(resp.message);
            }
        });
    }


    //条件的分页查询
    $scope.search = function(pageNum,pageSize,entity){
        userService.findPage(pageNum,pageSize,entity).success(function (resp) {
            $scope.paginationConf.totalItems =  resp.total;
            $scope.list = resp.rows;
        });
    }

});