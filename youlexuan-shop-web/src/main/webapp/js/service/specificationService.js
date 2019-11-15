app.service('specificationService',function ($http) {
    this.findAll = function () {
       return $http.get('../specification/findAll.do');
    }

    this.add = function (entity) {
        return $http.post('../specification/add.do',entity);
    }
    
    
    this.findOne = function (id) {
        return $http.get('../specification/findOne.do?id='+id);
    }
    
    this.update = function (entity) {
        return $http.post('../specification/update.do',entity);
    }

    this.delete = function (ids) {
        return $http.get('../specification/delete.do?ids='+ids);
    }
    
    this.findByCondition = function (searchEntity) {
        return $http.post('../specification/findByCondition.do',searchEntity);
    }
})