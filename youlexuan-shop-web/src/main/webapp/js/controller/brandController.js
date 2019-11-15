app.controller('brandController',function ($scope,$http,brandService ,$controller) {


    //声明:brandController需要继承baseControler中的组件
    $controller('baseController',{$scope:$scope});//brandController 继承 baseController中的内容

    $scope.delete = function(){

        //如果数组的长度为0，或者为空
        if($scope.selectIds==null || $scope.selectIds.length==0){
            alert("请选择数据后进行删除");
            return;
        }

        // $http.get("../brand/delete.do?ids="+$scope.selectIds).success(function (resp) {
        brandService.delete($scope.selectIds).success(function (resp) {
            if(resp.success){
                //删除成功，重新加载数据
                $scope.reloadList();
                $scope.selectIds = [];//清空数组
            }else{
                alert(resp.message)
            }
        });
    }


    $scope.findOne = function(id){
        // $http.get("../brand/findOne.do?tbid="+id).success(function (resp) {
        brandService.findOne(id).success(function (resp) {
            //resp
            $scope.entity = resp;
        });
    }


    //添加和修改都进入到save方法
    $scope.save = function(){
        //当entity中数据为空，不允许发送请求

        if($scope.entity.name=='' || $scope.entity.name == null){
            alert("品牌名称不能为空");
            return;
        }
        if($scope.entity.firstChar=='' || $scope.entity.firstChar == null){
            alert("首字母不能为空");
            return;
        }

        /*//根据entity中是否有id，判断是添加还是修改
        var methodName = "add";
        if($scope.entity.id!=null){
            methodName = "update";
        }
        $http.post("../brand/"+methodName+".do",$scope.entity).success(function (resp) {
            //resp
            if(resp.success){
                $scope.entity={name:'',firstChar:''};//清空数据
                //添加成功，重新加载页面数据
                $scope.reloadList();
            }else{
                alert(resp.message);
            }
        });*/

        //根据entity中是否有id，判断是添加还是修改
        if($scope.entity.id!=null){
            // $http.post("../brand/"+methodName+".do",$scope.entity).success(function (resp) {
            brandService.update($scope.entity).success(function (resp) {
                //resp
                if(resp.success){
                    $scope.entity={name:'',firstChar:''};//清空数据
                    //添加成功，重新加载页面数据
                    $scope.reloadList();
                }else{
                    alert(resp.message);
                }
            });
        }else{
            brandService.add($scope.entity).success(function (resp) {
                //resp
                if(resp.success){
                    $scope.entity={name:'',firstChar:''};//清空数据
                    //添加成功，重新加载页面数据
                    $scope.reloadList();
                }else{
                    alert(resp.message);
                }
            });
        }


    }

    //查询所有，不带分页
    $scope.findAll = function () {
        brandService.findAll().success(function (resp) {
            $scope.list = resp;
        });
    };

    //分页查询方法
    //参数1：页码
    //参数2: 每页显示的条数
    $scope.findPage = function(page,rows){
        // $http.get("../brand/findPage.do?pageNum="+page+"&pageSize="+rows).success(function (resp) {
        brandService.findPage(page,rows).success(function (resp) {
            //resp 的结构：   {  total：100，rows:[{},{},{}] }
            $scope.list = resp.rows;
            $scope.paginationConf.totalItems = resp.total;
        });
    };


    //定义查询条件的实体
    $scope.searchEntity = {};
    //带有条件的分页查询
    $scope.search = function(pageNum,pageSize){
        // $http.post("../brand/search.do?pageNum="+pageNum+"&pageSize="+pageSize,$scope.searchEntity).success(function (resp) {
        brandService.search(pageNum,pageSize,$scope.searchEntity).success(function (resp) {
            $scope.paginationConf.totalItems =   resp.total;
            $scope.list =  resp.rows;
        });
    }




});