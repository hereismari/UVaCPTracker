var app = angular.module('uvacp', []);

app.controller('uvacp_ctrl', function($scope, $http) {
    //$http.get("http://uhunt.felix-halim.net/api/cpbook/3")
    //.then(function(response) {
    //    $scope.myWelcome = response.data;
    //});

    $scope.test = function() {
      $scope.saveChanges()
      $scope.getUserID()
      $scope.getSubmissions()
    };

    $scope.saveChanges = function() {
      // Empty user_name not allowed
      if (!$scope.user_name) {
        console.log('Error: No value specified');
        return;
      }
      // Save it using the Chrome extension storage API.
      chrome.storage.sync.set({'value': $scope.user_name}, function() {
        // Notify that we saved.
        console.log('Settings saved');
      });
    }

    $scope.getSubmissions = function() {
      console.log($scope.user_id)
      var url = 'http://uhunt.felix-halim.net/api/subs-user/' + $scope.user_id;
      $http.get(url).then(function(response) {
        $scope.myWelcome = response.data;
      });
    }

    $scope.getUserID = function() {
      chrome.storage.sync.get('value', function(obj) {
        console.log(obj.value)
        var url = 'http://uhunt.felix-halim.net/api/uname2uid/' + obj.value;
        $http.get(url).then(function(response) {
          console.log(response.data)
          $scope.user_id = response.data;
        });
      });
    }


});

function getSubmissions(user) {

}

function saveChanges() {

}
