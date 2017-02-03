angular.module('uvacp').controller('ChapterController',
  ['$scope', function($scope)  {

    $scope.data = JSON.parse($scope.data);

    console.log($scope.data.title);

}]);
