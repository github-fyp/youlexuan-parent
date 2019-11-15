//定义一个service层
app.service('brandService',function($http){
    this.delete = function(ids){
        return $http.get('../brand/deleteBrand.do?deleteIds='+ids);
    };
    this.add = function(entity){
        return $http.post('../brand/addBrand.do',entity);
    };
    this.findPage = function(page,rows){
        return $http.get('../brand/findPage.do?pageNum='+page+'&pageSize='+rows);
    }
});