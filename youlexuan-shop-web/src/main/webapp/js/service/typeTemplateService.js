app.service('typeTemplateService',function ($http) {

    this.delete = function (ids) {
        return $http.get('../typeTemplate/delete.do?ids='+ids)
    }

    this.findOne = function (id) {
        return $http.get('../typeTemplate/findOne.do?id='+id);
    }

    this.findPage = function (pageNum, pageSize, searchEntity) {
        return $http.post('../typeTemplate/findPage.do?pageNum='+pageNum+'&pageSize='+pageSize,searchEntity);
    }
    
    this.initData = function () {
        return $http.get('../typeTemplate/initData.do');
    }

    this.add = function (entity) {
        return $http.post('../typeTemplate/add.do',entity);
    }

    this.update = function (entity) {
        return $http.post('../typeTemplate/update.do',entity);
    }

});