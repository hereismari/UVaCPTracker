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
 }]).run(function($rootScope, $location) {
        // register listener to watch route changes
        $rootScope.$on("$locationChangeSuccess", function(event) {
            chrome.storage.local.get('value', function(obj) {
                if(obj.value) {
                    $location.path('/main');
                }
                else {
                    $location.path('/');
                }
            });
        });
});
