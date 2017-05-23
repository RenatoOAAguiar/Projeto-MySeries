(function() {
    angular.module("MySeries")
        .config(function($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "templates/main.html",
                    controller: "PrincipalCtrl"
                })
                .when("/serie/:nome", {
                    templateUrl: "templates/serie.html",
                    controller: "SerieCtrl"
                })
                .when("/criticas", {
                    templateUrl: "templates/criticas.html",
                    controller: "CriticasCtrl"
                })
                .when("/cadastro", {
                    templateUrl: "templates/cadastro.html",
                    controller: "CadastroCtrl"
                })
                .when("/usuario", {
                    templateUrl: "templates/usuario.html",
                    controller: "UsuarioCtrl"
                })
                .otherwise({ redirectTo: '/' });
        });
})();