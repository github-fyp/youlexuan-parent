app.controller('typeTemplateController',function ($scope,typeTemplateService,$controller) {
    //继承
    $controller('baseController',{$scope:$scope});

    $scope.delete = function(){
        typeTemplateService.delete($scope.selectIds).success(function (resp) {
            if(resp.success){
                $scope.reloadList();
                $scope.selectIds = [];
            }
        })
    }


    $scope.findOne = function(id){
        typeTemplateService.findOne(id).success(function (resp) {
            //resp
            $scope.entity = resp;
            //数据库中，resp中的brandIds，specIds 字符串
            //JSON.parse(str) 将字符串转成json
            $scope.entity.brandIds = JSON.parse($scope.entity.brandIds);
            $scope.entity.specIds = JSON.parse($scope.entity.specIds);
            $scope.entity.customAttributeItems = JSON.parse($scope.entity.customAttributeItems);

        });
    }

    $scope.save = function(){
        if($scope.entity.id == null){
            typeTemplateService.add($scope.entity).success(function (resp) {
                if(resp.success){
                    $scope.reloadList();
                    $scope.entity = {customAttributeItems:[]};
                }else{
                    alert(resp.message);
                }
            });
        }else{
            typeTemplateService.update($scope.entity).success(function (resp) {
                if(resp.success){
                    $scope.reloadList();
                    $scope.entity = {customAttributeItems:[]};
                }else{
                    alert(resp.message);
                }
            });
        }
    }




    $scope.entity = {customAttributeItems:[]};

    $scope.addRow = function(){
        $scope.entity.customAttributeItems.push({});
    }

    $scope.deleteRow = function(index){
        $scope.entity.customAttributeItems.splice(index,1);
    }

    //关联品牌 多选下拉框中预置的数据
    $scope.brandList = {data:[]};

    //规格下拉框
    $scope.specList = {data:[]};
    
    $scope.initData =  function(){
        typeTemplateService.initData().success(function (resp) {
            /*$scope.specList.data = resp.specList;
            $scope.brandList.data =  resp.brandList;*/
            $scope.brandList = {data:resp.brandList};

            //规格下拉框
            $scope.specList = {data:resp.specList};
        });
    }



    $scope.searchEntity = {};

    $scope.search = function (pageNum, pageSize, searchEntity) {
        typeTemplateService.findPage(pageNum, pageSize, searchEntity).success(function (resp) {
            $scope.list = resp.rows;
            $scope.paginationConf.totalItems = resp.total;
        });
    }

    // 将 json字符串 某个属性的值取出来，形成一个普通字符串
    // [{"id":2,"text":"华为"},{"id":4,"text":"小米"}]   ---- >   把text属性取出来     华为,小米

    $scope.jsonToString = function (jsonStr,key) {
        var jsonArr = JSON.parse(jsonStr);
        var str = [];
        for(var i = 0 ; i < jsonArr.length ; i++){
            var jsonObj = jsonArr[i];//{"id":2,"text":"华为"}
            // jsonArr.key;不能这样写，原因：key是一个参数（变量）
            /*jsonObj.text;
            jsonObj.name;*/
            str.push(jsonObj[key]);
        }
        return str.toString();// 华为,小米
    }

});