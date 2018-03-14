var app = angular.module('LazyLoad', ['ngRoute']);
app.config(['$routeProvider', '$controllerProvider', '$provide','$compileProvider','$filterProvider', function($routeProvider, $controllerProvider, $provide,$compileProvider,$filterProvider) {
  app.register = {
    controller: $controllerProvider.register,
    directive: $compileProvider.directive,
    filter: $filterProvider.register,
    factory: $provide.factory,
    service: $provide.service
  };

  function resolveController(dependencies) {
    return {
      load: ['$q', '$rootScope', function($q, $rootScope) {
        var defer = $q.defer();
        require(dependencies, function() {
          defer.resolve();
          $rootScope.$apply();
        });
        return defer.promise;
      }]
    }
  };
  $routeProvider
    .when("/home", {
      templateUrl: "app/views/home.html",
      controller: 'HomeCtrl',
      resolve: resolveController(['app/controllers/HomeCtrl'])
    })
    .when("/about_us", {
      templateUrl: "app/views/about_us.html",
      controller: 'AboutUsCtrl',
      resolve: resolveController(['app/controllers/AboutUsCtrl'])
    })
    .when("/services", {
      templateUrl: "app/views/services.html",
      controller: 'ServicesCtrl',
      resolve: resolveController(['app/controllers/ServicesCtrl'])
    })
    .when("/contact_us", {
      templateUrl: "app/views/contact_us.html",
      controller: 'ContactUsCtrl',
      resolve: resolveController(['app/controllers/ContactUsCtrl'])
    });
  $routeProvider.otherwise('/home');
}]);
