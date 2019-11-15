//商品类目控制层
app.controller('itemCatController', function ($scope, $controller, itemCatService, typeTemplateService) {

    $controller('baseController', {$scope: $scope});//继承



    //查询模板数据
    $scope.findAllTypeTemplate = function () {
        typeTemplateService.findAll().success(function (resp) {
            $scope.typeTemplateList = resp;
        })
    };

    //级数
    $scope.grade = 1;
    $scope.setGrade = function () {
        $scope.grade = $scope.grade + 1;
    };

    $scope.parentId = 0;
    //根据商品ID查询商品分类数据
    $scope.findList = function (parentId) {
        $scope.parentId = parentId;
        itemCatService.findList(parentId).success(function (resp) {
            $scope.list = resp;
        })
    };

    //读取列表数据绑定到表单中  
    $scope.findAll = function () {
        itemCatService.findAll().success(
            function (response) {
                $scope.list = response;
            }
        );
    };

    //分页
    $scope.findPage = function (page, rows) {
        itemCatService.findPage(page, rows).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    };

    //查询实体
    $scope.findOne = function (id) {
        itemCatService.findOne(id).success(
            function (response) {
                $scope.entity = response;
            }
        );
    };

    //保存
    $scope.save = function () {
        itemCatService.add($scope.entity).success(function(resp){
            if(resp.success){
                //重新加载
                $scope.findList($scope.parentId);
            }else{
                alert(resp.message);
            }
        })


       /* var serviceObject;//服务层对象
        if ($scope.entity.id != null) {//如果有ID
            serviceObject = itemCatService.update($scope.entity); //修改
        } else {
            serviceObject = itemCatService.add($scope.entity);//增加
        }
        serviceObject.success(
            function (response) {
                if (response.success) {
                    //重新查询
                    $scope.reloadList();//重新加载

                } else {
                    alert(response.message);
                }
            }
        );*/
    };

    $scope.deleteIds = [];
    $scope.updateSelection=function($event,id){
        //复选框选中  将id存放在数组中
        if($event.target.checked){
            $scope.deleteIds.push(id);
        }else{
            //复选框取消选中   将数组中的id删除
            $scope.deleteIds.splice($scope.deleteIds.indexOf(id),1);
        }
    };


    //批量删除
    //if($scope.grade = 3){
        $scope.dele = function () {
            //获取选中的复选框
            alert($scope.deleteIds);
            itemCatService.dele($scope.deleteIds).success(
                function (response) {
                    if (response.success) {
                        alert("成功的");
                        $scope.deleteIds = [];
                        $scope.findList($scope.parentId);//刷新列表
                    }else{
                        alert("失败的");
                    }
                }
            );
        };
   // }else{
        //alert("不能删除有子节点的数据")
   //}


    $scope.searchEntity = {};//定义搜索对象

    //搜索
    $scope.search = function (page, rows) {
        itemCatService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    }

});	