angular.module('uvacp', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'angularCSS']).
  config(['$routeProvider', function($routeProvider) {
      $routeProvider
      .when('/main', {
          templateUrl: 'views/main/main.html',
          controller: 'MainController',
          css: 'views/main/main.css' })
      .when('/', {
          templateUrl: 'views/login/login.html',
          controller: 'LoginController',
          css: 'views/login/login.css' })
      .otherwise({ redirectTo: '/' });
   }])
   .directive(
            "mAppLoading",
            function($animate) {
                // Return the directive configuration.
                return({
                    link: link,
                    restrict: "C"
                });
                // I bind the JavaScript events to the scope.
                function link(scope, element, attributes) {
                    // Due to the way AngularJS prevents animation during the bootstrap
                    // of the application, we can't animate the top-level container; but,
                    // since we added "ngAnimateChildren", we can animated the inner
                    // container during this phase.
                    // --
                    // NOTE: Am using .eq(1) so that we don't animate the Style block.
                    $animate.leave(element.children().eq(1)).then(
                        function cleanupAfterAnimation() {
                            // Remove the root directive element.
                            element.remove();
                            // Clear the closed-over variable references.
                            scope = element = attributes = null;
                        }
                    );
                }
            }
        );


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
