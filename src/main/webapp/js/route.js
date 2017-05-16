(function () {
angular.module("MySeries")
.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "templates/main.html",
    controller : "PrincipalCtrl"
  })
  .when("/serie/:nome", {
    templateUrl : "templates/serie.html",
    controller : "SerieCtrl"
  })
  .otherwise({redirectTo :'/'});
});
})();
