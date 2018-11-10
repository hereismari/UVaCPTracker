angular.module('uvacp').service('WebRequest', function($http) {
    this.get = function(url, useCors) {
        if (useCors) {
            url = 'https://cors.io/?' + url;
        }
        return $http.get(url).then(function(response) {
            return response;
        });
    };
});
