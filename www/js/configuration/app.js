angular.module('MEYE', ['ngRoute'])
.config(function ($routeProvider, $httpProvider) {
    $routeProvider.when("/", {
        templateUrl: "Views/home.html",
        controller: "",
    }).when("/whatisglaucoma", {
        templateUrl: "Views/glaucoma/whatis.html",
        controller: "",
        requiresLogin: false
    }).when("/detect", {
        templateUrl: "Views/detector/detection.html",
        controller: "",
        requiresLogin: false
    }).when("/verify/:id?", {
        templateUrl: "Views/Account/verify.html",
        controller: "",
    }).otherwise({ redirectTo: '/' });
}).run(['$rootScope', '$location', 'AuthService', function ($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
        if (next.requiresLogin && !AuthService.isAuthenticated()) {
            console.log('Unauthorised User');
            event.preventDefault();
            $location.path('/login');
        } else {
            return $location.path;
        }
    });
}]);




