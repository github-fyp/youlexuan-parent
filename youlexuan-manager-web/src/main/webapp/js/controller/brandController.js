//创建controller
app.controller('brandController',function($scope,$http,brandService){

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

    //删除品牌
    $scope.delete=function(deleteIds){
        brandService.delete($scope.deleteIds).success(function(resp){
            if(resp.success){
                $scope.reloadList();//刷新列表
                alert(resp.message);
                $scope.deleteIds = [];
            }else{
                alert(resp.message);
                $scope.deleteIds = [];
            }
        })
    };

    //添加新品牌
    $scope.add=function(){
        brandService.add($scope.entity).success(function(resp){
            if(resp.success){
                $scope.reloadList();//重新加载
                alert(resp.message);
            }else{
                alert(resp.message);
            }
        })
    };

    //分页查询
    $scope.findPage = function(page,rows){
        brandService.findPage(page,rows).success(function(resp){
            $scope.list = resp.rows;
            $scope.paginationConf.totalItems = resp.total;

        })
    };

    //重新加载列表 数据
    $scope.reloadList=function(){
        //切换页码
        $scope.findPage( $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
    };

    //分页控件配置
    $scope.paginationConf = {
        currentPage: 1,//当前页
        totalItems: 10,//总记录数
        itemsPerPage: 10,//每页显示多少数
        perPageOptions: [10, 15, 20, 25, 30],
        onChange: function(){
            $scope.reloadList();//重新加载，分页组件变化后会触发该函数
        }
    };
})