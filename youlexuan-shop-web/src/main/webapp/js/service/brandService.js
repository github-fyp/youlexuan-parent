app.service('brandService',function ($http) {
    this.delete = function (ids) {
        return $http.get("../brand/delete.do?ids="+ids);
    };

    this.findOne = function (id) {
        return $http.get("../brand/findOne.do?tbid="+id);
    };

    this.add = function (entity) {
        return $http.post("../brand/add.do",entity);
    };

    this.update = function (entity) {
        return $http.post("../brand/update.do",entity);
    };

    this.findAll = function () {
        return $http.get("../brand/findAll.do");
    }

    this.findPage = function (page,rows) {
        return $http.get("../brand/findPage.do?pageNum="+page+"&pageSize="+rows) ;
    }

    this.search = function (pageNum,pageSize,searchEntity) {
        return $http.post("../brand/search.do?pageNum="+pageNum+"&pageSize="+pageSize,searchEntity);
    }
});