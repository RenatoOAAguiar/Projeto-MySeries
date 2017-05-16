angular.module('MySeries').controller('SideNavCtrl', function($scope){
})

.controller('SerieCtrl', function($scope, $http, $routeParams, $rootScope, UrlGetService, EpisodesService){
    $scope.titulo = "Top Series";
    $scope.poster = '';
    var nome = $routeParams.nome;
    var url = "http://www.omdbapi.com/?t="+ nome +"&plot=full";
    var dadosSeason = [];
    var dados = {};
    
    $('#comentario').trigger('autoresize');
       UrlGetService.getUrl(url).then(function (response){
            dados = response.data;
            $scope.poster = dados.Poster;
            $scope.titulo = dados.Title;
            $scope.descricao = dados.Plot;
            $scope.nota = dados.Ratings[0].Value;
            $scope.atores = dados.Actors;
            var totalSeason = dados.totalSeasons;
            $scope.premiacao = dados.Awards;
            $scope.id = dados.imdbID;
            var episodios = [];
            for(i = 1 ; i < totalSeason; i ++){
                var urlSeason = "http://www.omdbapi.com/?t="+$routeParams.nome+"&Season="+i;
                EpisodesService.getUrl(urlSeason).then(function (response){
                    episodios.push(response.data.Episodes)
                })
            }
            $scope.episodios = episodios;

       });

})

.controller('LoginCtrl', function($scope, $timeout, cfpLoadingBar){
    $scope.login = function(){
        cfpLoadingBar.start();
        $timeout(function () {
            cfpLoadingBar.complete();
            $('#userSettings').removeClass('hide');
            $('#linkLogin').addClass('hide');
            $scope.habilitarPerfil();
            //$('.conteudo').addClass('hide');
        }, 3000);
        delete $scope.usuario;
        delete $scope.senha;
    }

    $scope.validaCampos = function(){
        if($scope.usuario == "" || $scope.senha == "" || $scope.usuario == undefined || $scope.senha == undefined){
            return true;
        } else{
            return false;
        }
    }

    $scope.habilitarPerfil = function(){
        $scope.perfilOk == true;
    }
})

.controller('PrincipalCtrl', function ($scope, $compile){
     $scope.titulo = "Top Series";
     $('#comentario').trigger('autoresize');
     window.setInterval(function() {
            $('.carousel').carousel('next')
     }, 5000);
});