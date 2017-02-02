angular.module('uvacp', []).
    controller('uvacpCtrl', function($scope, $http) {
    //$http.get("http://uhunt.felix-halim.net/api/cpbook/3")
    //.then(function(response) {
    //    $scope.myWelcome = response.data;
    //});

    $scope.submitChanges = function() {
      $scope.saveChanges()
       chrome.storage.sync.get('value', function(obj) {
           if(obg.value) {

           }
       });
      $scope.getSubmissions()
    };

    $scope.saveChanges = function() {
      // Empty user_name not allowed
      if (!$scope.user_name) {
          chrome.storage.sync.get('value', function(obj){
              if(!obj.value) {
                  console.log('Error: No value specified');
                  return false;
              }
              else {
                  console.log('Value found!');
              }
        });
      }
      else {
          // Save it using the Chrome extension storage API.
          chrome.storage.sync.set({'value': $scope.user_name}, function() {
            // Notify that we saved.
            console.log('Settings saved');
          });
      }
      return true;
    }

    $scope.getSubmissions = function() {
      chrome.storage.sync.get('value', function(obj) {
        console.log(obj.value)
        var url_id = 'http://uhunt.felix-halim.net/api/uname2uid/' + obj.value;
        $http.get(url_id).then(function(response) {
          var user_id = response.data;
          var url_subs = 'http://uhunt.felix-halim.net/api/subs-user/' + user_id;
          $http.get(url_subs).then(function(submssions) {
            $scope.myWelcome = submssions.data;
          });
        });
      });
    }

});

function getSubmissions(user) {

}

function saveChanges() {

}
