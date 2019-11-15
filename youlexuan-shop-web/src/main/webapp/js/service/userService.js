app.service('userService',function ($http) {
    this.delete = function (id) {
        return $http.get('/usercenter/delete.do?ids='+ id);
    };
    this.findPage = function (pageNum,pageSize,entity) {
        return $http.post('../usercenter/findPage.do?pageNum='+pageNum+'&pageSize='+pageSize,entity);
    }
})