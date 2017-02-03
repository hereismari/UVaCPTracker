angular.module('uvacp').controller('MainController',
    ['$scope', '$http', '$location', function($scope, $http, $location) {

    chrome.storage.sync.get('value', function(obj) {
        if(!obj.value) {
            $scope.changeView();
        }
        var url_id = 'http://uhunt.felix-halim.net/api/uname2uid/' + obj.value;
        $http.get(url_id).then(function(response) {
            console.log(response.data);
            if(!response.data) {
                  $scope.changeView();
            }
            var user_id = response.data;
            var url_subs = 'http://uhunt.felix-halim.net/api/subs-user/' + user_id;
            $http.get(url_subs).then(function(submssions) {
                $scope.myWelcome = submssions.data;
            });
        });
    });

    $http.get("http://uhunt.felix-halim.net/api/cpbook/3")
        .then(function(response) {
            $scope.myWelcome2 = response.data;
        });

    

    $scope.changeView = function(view) {
        $location.path('/' + view);
    };

}]);
