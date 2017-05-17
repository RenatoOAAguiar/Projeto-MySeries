angular.module('MySeries').controller('SideNavCtrl', function($scope){
})

.controller('SerieCtrl', function($scope, $http, $routeParams, $rootScope, UrlGetService, EpisodesService, IdImdbService){
    $scope.titulo = "Top Series";
    $scope.poster = '';
    var nome = $routeParams.nome;
    var url = "http://www.omdbapi.com/?t="+ nome +"&plot=full";
    var dadosSeason = [];
    var dados = {};
    $scope.badge = 10;
    
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
     $scope.calculaAvaliacao = function(aval){
         if(aval == 1){
             $scope.badge ++;
         } else {
             $scope.badge --;
         }
     }

    $scope.dadosEpisodio = function(id) {
        $scope.enviaId(id);
        $rootScope.$emit("buscarEpisodio", {});
    }

    $scope.enviaId = function(id){
        IdImdbService.setProperty(id);
    };
    

})

.controller('LoginCtrl', function($scope, $timeout, cfpLoadingBar){
    $scope.login = function(){
        cfpLoadingBar.start();
        $timeout(function () {
            cfpLoadingBar.complete();
            $('#userSettings').removeClass('hide');
            $('#linkLogin').addClass('hide');
            $('#modal1').modal('close');
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
})

.controller('CriticasCtrl', function($scope){
    $scope.titulo = "Críticas";
})

.controller('DetalheSerieCtrl', function($scope, $rootScope, EpisodesService, IdImdbService){
    $rootScope.$on("buscarEpisodio", function(){
           $scope.buscarEpisodio();
    });
     
     $scope.buscarEpisodio = function(){
         id = IdImdbService.getProperty();
         var url = "http://www.omdbapi.com/?i="+id;
         EpisodesService.getUrl(url).then(function (response){
            console.log(url);
            console.log(response);
            $('#modaldetalhe').modal('open')
            $scope.tituloEpisodio = response.data.Title;
            $scope.lancadoEpisodio = response.data.Released;
            $scope.seasonEpisodio = response.data.Season;
            $scope.seasonEp = response.data.Episodio;
            $scope.posterEpisodio = response.data.Poster;
            $scope.sinopseEpisodio = response.data.Plot;
         });
     }
})