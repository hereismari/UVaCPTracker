angular.module('uvacp').controller('LoginController',
  ['$scope', '$http', '$location', function($scope, $http, $location)  {

    $scope.submitChanges = function() {
          if (!$scope.user_name) {
              console.log('Error: No value specified');
          }
          else {
            chrome.storage.sync.set({'value': $scope.user_name},
                $scope.changeView('main'));
          }
      };

    $scope.changeView = function(view) {
        $location.path('/' + view);
    }

}]);
