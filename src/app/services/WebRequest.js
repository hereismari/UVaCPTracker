angular.module('uvacp').service('WebRequest', function($http) {

    this.get = function(url) {
      return $http.get(url).then(function(response) {
          return response;
      });
    };

});
