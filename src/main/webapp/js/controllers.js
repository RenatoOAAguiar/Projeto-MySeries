angular.module('MySeries').controller('SideNavCtrl', function($scope){
})

.controller('SerieCtrl', function($scope, $http, $routeParams, $rootScope){
    $scope.titulo = "Top Series";
    $scope.poster = '';
    var nome = $routeParams.nome;
    var url = "http://www.omdbapi.com/?t="+ nome +"&plot=full";
    var dadosSeason = [];
    
    $('#comentario').trigger('autoresize');
    $http({
        method: 'GET',
        url: url
    }).then(function successCallback(response) {
       
       $scope.poster = response.data.Poster;
       $scope.titulo = response.data.Title;
       $scope.descricao = response.data.Plot;
       $scope.nota = response.data.Ratings[0].Value;
       $scope.atores = response.data.Actors;
       $rootScope.totalSeason = response.data.totalSeasons;
       $scope.premiacao = response.data.Awards;
       $scope.id = response.data.imdbID;
    }, function errorCallback(response) {
       console.log(response);
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
})

.controller('EpisodiosCtrl', function ($scope, $http, $routeParams, $rootScope){
    for(i = 0; $rootScope.totalSeason > i; i++){
        var urlSeason = "http://www.omdbapi.com/?t="+$routeParams.nome+"&Season="+i;
            $http({
                method: 'GET',
                url: urlSeason
            }).then(function successCallback(response) {
                dadosSeason.push(response.data.Episodes);
                console.log(i);
            }, function errorCallback(response) {
            console.log(response);
            });
    }
});