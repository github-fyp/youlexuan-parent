app.controller('baseController',function ($scope) {

    //条件查询
    $scope.searchEntity = {};//定义搜索对象

    $scope.selectIds = [];//选中的id

    $scope.updateSelection  = function($event,id){
        if($event.target.checked){
            $scope.selectIds.push(id);
        }else{
            var index =  $scope.selectIds.indexOf(id);
            $scope.selectIds.splice(index,1);
        }
    };

    //重新加载页面数据
    $scope.reloadList = function(){
        $scope.findPage($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage,$scope.searchEntity);
    };


    //定义分页组件的模型数据paginationConf
    $scope.paginationConf = {
        currentPage: 1,//当前页
        totalItems: 10,//总计数（给的初始值，实际应该是pageresult中的total的值）
        itemsPerPage: 10,//每页显示的记录数（默认值）
        perPageOptions: [10,20,30],//每页显示条数 的 下拉框
        onChange: function(){//当分页控件的数据改变，自动触发onChange对应的方法
            $scope.reloadList();//重新加载，分页组件中的任何一个值变化后会触发该函数
            //页面加载分页组件的时候，会自动执行onChange中的内容
        }
    };
});