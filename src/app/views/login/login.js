angular.module('uvacp').controller('LoginController',
  ['$scope', 'WebRequest', '$location', function($scope, WebRequest, $location)  {

    $scope.error_message = '';

    $scope.submit = function() {
        if (!$scope.user_name) {
            $scope.error_message = 'No value specified';
        }
        else {

            var url_id = 'http://uhunt.felix-halim.net/api/uname2uid/' + $scope.user_name;

            var url_id_promise = WebRequest.get(url_id);
            url_id_promise.then(function(response) {
                if(!response.data) {
                    $scope.error_message = 'Invalid username';
                }
                else {
                    chrome.storage.local.set({'value': $scope.user_name},
                        $scope.changeView('main'));
                }
          });
        }
    };

    $scope.changeView = function(view) {
        $location.path('/' + view);
    }

}]);
