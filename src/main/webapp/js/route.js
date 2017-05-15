(function () {
angular.module("MySeries")
.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "templates/main.html",
    controller : "DetalhesSerieCtrl"
  })
  .when("/serie", {
    templateUrl : "templates/serie.html",
    controller : "SerieCtrl"
  })
  .otherwise({redirectTo :'/'});
});
})();
