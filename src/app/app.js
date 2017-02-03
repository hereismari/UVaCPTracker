angular.module('uvacp', ['ngRoute']).
  config(['$routeProvider', function($routeProvider) {
      $routeProvider
      .when('/main', { templateUrl: 'views/main/main.html',
          controller: 'MainController' })
      .when('/', { templateUrl: 'views/login/login.html',
          controller: 'LoginController' })
      .otherwise({ redirectTo: '/' });
   }])
   .directive('chapter', function() {
       return {
           restrict: 'E',
           transclude: true,
           scope: {},
           controller: 'ChapterController',
           templateUrl: 'directives/chapter/chapter.html',
           replace: true
       };
   });

  /*.run(function($rootScope, $location) {
      // register listener to watch route changes
      $rootScope.$on("$routeChangeStart", function(event, next, current) {
          chrome.storage.sync.get('value', function(obj) {
              console.log(obj.value);
              if(obj.value) {
                if(next.templateUrl != '/main') {
                  $location.path('/main');
                }
              }
              else {
                $location.path('/');
              }
          });
      });
  });
*/
