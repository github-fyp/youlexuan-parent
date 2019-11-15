app.controller('specificationController',function ($scope, specificationService,$controller) {

    $controller('baseController',{$scope:$scope});



    $scope.findByCondition = function(){
        specificationService.findByCondition($scope.searchEntity).success(function (resp) {
            $scope.list = resp;
        });
    }

    $scope.delete = function(){
        specificationService.delete($scope.selectIds).success(function (resp) {
            if(resp.success){
                $scope.findAll();
                $scope.selectIds=[];
            }else{
                alert(resp.message)
            }
        });
    }


    $scope.update = function(){
        specificationService.update($scope.entity).success(function (resp) {
            if(resp.success){
                $scope.findAll();
                $scope.entity = {specification:{},specificationOption:[]};
            }else{
                alert(resp.message)
            }
        });
    }

    $scope.findOne = function(id){
        specificationService.findOne(id).success(function (resp) {
            $scope.entity = resp;
        });
    }

    $scope.save  = function(){
        //判断是添加还是修改  entity.specification.id

        if($scope.entity.specification.id == null){
            specificationService.add($scope.entity).success(function (resp) {
                if(resp.success){
                    //添加成功，当前页面重新加载
                    // $scope.reloadList();
                    $scope.findAll();
                    $scope.entity = {specification:{},specificationOption:[]};
                }else{
                    alert(resp.message)
                }
            })
        }else{
            $scope.update();
        }


    }

    $scope.findAll = function () {
        specificationService.findAll().success(function (resp) {
            $scope.list = resp;
        });
    };

    $scope.entity = {specification:{},specificationOption:[]};

    //定义方法，让让数组的长度+1(push),  【新增规格选项】调用该方法
    $scope.addRow = function () {
        $scope.entity.specificationOption.push({});
    }

    //删除行,从数组中指定位置进行删除
    $scope.deleteRow = function (index) {
        $scope.entity.specificationOption.splice(index,1);
    }

})