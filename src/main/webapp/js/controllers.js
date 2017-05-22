angular.module('MySeries')

.controller('SideNavCtrl', function ($scope, $location, $rootScope) {
    $rootScope.statusLogin = true;
    $scope.sair = function () {
        $('#userSettings').addClass('hide');
        $('#linkLogin').removeClass('hide');
        $('#linkSair').addClass('hide');
        $location.url("/");
        Materialize.toast('Logoff efetuado com sucesso!', 4000);
    }
})

.controller('SerieCtrl', function ($scope, $http, $routeParams, $rootScope, UrlGetService, EpisodesService, IdImdbService) {
    $scope.titulo = "Top Series";
    $scope.poster = '';
    var nome = $routeParams.nome;
    var url = "http://www.omdbapi.com/?apikey=6b754581&t=" + nome + "&plot=full";
    var dadosSeason = [];
    var dados = {};
    $scope.badge = 10;
    $scope.marcar = "img/icons/check-icon.png";
    $scope.desmarcar = "img/icons/eye-icon.png";
    $scope.usuarioId = 1;

    $('#comentario').trigger('autoresize');
    UrlGetService.getUrl(url).then(function (response) {
        console.log(response.data);
        dados = response.data;
        $scope.poster = dados.Poster;
        $scope.titulo = dados.Title;
        $scope.descricao = dados.Plot;
        $scope.nota = dados.Ratings[0].Value;
        $scope.atores = dados.Actors;
        $scope.duracao = dados.Runtime;
        $scope.ano = dados.Year;
        $scope.genero = dados.Genre;
        $scope.diretor = dados.Director;
        $scope.escritor = dados.Writer;
        $scope.pais = dados.Country;
        var totalSeason = dados.totalSeasons;
        $scope.premiacao = dados.Awards;
        $scope.qtdVotos = dados.imdbVotes;
        $scope.id = dados.imdbID;
        var episodios = [];
        var qtdEpisodios = 0;
        var assistidos = [];

        for (i = 1; i <= totalSeason; i++) {
            var urlSeason = "http://www.omdbapi.com/?apikey=6b754581&t=" + $routeParams.nome + "&Season=" + i;
            EpisodesService.getUrl(urlSeason).then(function (response) {
                episodios.push(response.data.Episodes);
                episodios.Season = response.data.Season;
                qtdEpisodios += response.data.Episodes.length;
                for (i = 0; i < response.data.Episodes.length; i++) {
                    assistidos.push(0);
                }
            })
                console.log(episodios);
        }
        $scope.assistidos = assistidos;
        $scope.episodios = episodios;

    })

    $scope.calculaAvaliacao = function (aval, index) {
        if($scope.desabilitaAvaliacao(index)){
            Materialize.toast('Já votou!', 4000);
            return false;
        }
        if (aval == 1) {
            $scope.listaComentarios[index].badges ++;
        } else {
            $scope.listaComentarios[index].badges --;
        }
        Materialize.toast('Comentário Avaliado', 4000);
        $scope.listaComentarios[index].avaliaram.push($scope.usuarioId);
    }

    $scope.desabilitaAvaliacao = function (index){
        var retorno = true;
        if($scope.listaComentarios[index].avaliaram.length == 0){
            retorno = false;
        }
        $.each($scope.listaComentarios[index].avaliaram, function (i, val) {
                if(val == $scope.usuarioId){
                    retorno = true;
                } else {
                    retorno = false;
                }
        });
        return retorno;
    }

    $scope.dadosEpisodio = function (id) {
        $scope.enviaId(id);
        $rootScope.$emit("buscarEpisodio", {});
    }

    $scope.enviaId = function (id) {
        IdImdbService.setProperty(id);
    }

    $scope.marcarAssistido = function (index) {
        var elemento = $('#assistido' + index);
        if ($scope.assistidos[index] == 0) {
            $scope.assistidos[index] = 1;
        } else {
            $scope.assistidos[index] = 0;
        }
        console.log($scope.assistidos);
    }

    //Banco de dados deve ter atributo inputando se o usuário já assistiu ou não todos episódios
    $scope.marcarDesmarcarTodos = function () {
        var valor = $('#marcarTodos').val();
        for (i = 0; i < $scope.assistidos.length; i++) {
            if (valor == 0) {
                $scope.assistidos[i] = 1;
            } else {
                $scope.assistidos[i] = 0;
            }
        }
        if (valor == 0) {
            $('#marcarTodos').attr('src', $scope.marcar);
            $('#marcarTodos').val(1);
        } else {
            $('#marcarTodos').attr('src', $scope.desmarcar);
            $('#marcarTodos').val(0);
        }
    }

    $scope.validaComentario = function () {
        if ($scope.comentario == "" || $scope.comentario == undefined) {
            return true;
        } else {
            return false;
        }
    }

    $scope.enviarComentario = function (){
        var objComentario = {
            usuarioId : 1,
            idComentario : 4,
            usuario : "Jacó",
            avatar : "img/avatar.jpg",
            badges : 0,
            comentario : $scope.comentario,
            avaliaram : []
        }
        $scope.listaComentarios.push(objComentario);
        $("#comentario").val("");
        Materialize.toast('Comentário Inserido com sucesso!', 4000);
    }

    //Recupera os comentários do arquivo JSON
    var json = "http://localhost:9090/Projeto-MySeries/mock/comentarios.json";
    UrlGetService.getUrl(json).then(function (response) {
        $scope.listaComentarios = response.data;
        $scope.qtdComentarios = response.data.length;
    })

})

.controller('LoginCtrl', function ($scope, $timeout, cfpLoadingBar, $location, $rootScope) {
    $scope.login = function () {
        cfpLoadingBar.start();
        $timeout(function () {
            cfpLoadingBar.complete();
            $('#userSettings').removeClass('hide');
            $('#linkLogin').addClass('hide');
            $('#linkSair').removeClass('hide');
            $('#modal1').modal('close');
            $scope.habilitarPerfil();
            $rootScope.statusLogin = false;
            //$('.conteudo').addClass('hide');
        }, 3000);
        delete $scope.usuario;
        delete $scope.senha;
    }

    $scope.validaCampos = function () {
        if ($scope.usuario == "" || $scope.senha == "" || $scope.usuario == undefined || $scope.senha == undefined) {
            return true;
        } else {
            return false;
        }
    }

    $scope.habilitarPerfil = function () {
        $scope.perfilOk == true;
    }
})

.controller('PrincipalCtrl', function ($scope, $compile) {
    $scope.titulo = "Top Series";
        $scope.listaSeries =[
    {titulo: "Series de 8.9 até 8.0",
        serie1:"Black Mirror", img1:"https://images-na.ssl-images-amazon.com/images/M/MV5BMTk5NTk1Mzg3Ml5BMl5BanBnXkFtZTcwNDAyNzY3OA@@._V1._CR25,3,1010,1343_SY1000_CR0,0,752,1000_AL_.jpg",
        serie2:"Vikings", img2:"https://images-na.ssl-images-amazon.com/images/M/MV5BOTEzNzI3MDc0N15BMl5BanBnXkFtZTgwMzk1MzA5NzE@._V1_.jpg",
        serie3:"Mr. Robot", img3:"https://images-na.ssl-images-amazon.com/images/M/MV5BMTYzMDE2MzI4MF5BMl5BanBnXkFtZTgwNTkxODgxOTE@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        serie4:"South Park", img4:"https://images-na.ssl-images-amazon.com/images/M/MV5BZWY4ODY3ZTAtODc2NC00ZDQ5LWE2ZTItZWYzOWVhNjU4OTk0XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
        serie5:"Shingeki no kyojin", img5:"https://images-na.ssl-images-amazon.com/images/M/MV5BMTY5ODk1NzUyMl5BMl5BanBnXkFtZTgwMjUyNzEyMTE@._V1_.jpg"
    },
    {titulo: "Series de 7.9 até 7.0",
        serie1:"Scream Queens ", img1:"https://images-na.ssl-images-amazon.com/images/M/MV5BMjMzNTMyMjEwMV5BMl5BanBnXkFtZTgwMjIxNjE1OTE@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        serie2:"Once Upon a Time", img2:"https://images-na.ssl-images-amazon.com/images/M/MV5BNmVjNGRlM2UtNTc3Zi00NDliLTg1NzItZjY1ZDFjNDI0MWFmXkEyXkFqcGdeQXVyMzAzNTY3MDM@._V1_.jpg",
        serie3:"Scream", img3:"https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ0MDM1MzU2NV5BMl5BanBnXkFtZTgwMjQ5OTkzODE@._V1_SX300.jpg",
        serie4:"Luke Cage", img4:"https://images-na.ssl-images-amazon.com/images/M/MV5BMTcyMzc1MjI5MF5BMl5BanBnXkFtZTgwMzE4ODY2OTE@._V1_SY1000_CR0,0,704,1000_AL_.jpg",
        serie5:"Iron Fist", img5:"https://images-na.ssl-images-amazon.com/images/M/MV5BMjI5Mjg1NDcyOV5BMl5BanBnXkFtZTgwMjAxOTQ5MTI@._V1_SX300.jpg"
    },
    {titulo: "Series abaixo 7.0",
        serie1:"Supergirl", img1:"https://images-na.ssl-images-amazon.com/images/M/MV5BMjM5Mjg2MDAxMl5BMl5BanBnXkFtZTgwMjE0NDg4OTE@._V1_SY1000_CR0,0,667,1000_AL_.jpg",
        serie2:"Terra Nova", img2:"https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxNTQ4OTQ2OV5BMl5BanBnXkFtZTcwMzA3OTQzNg@@._V1_.jpg",
        serie3:"Revolution", img3:"https://images-na.ssl-images-amazon.com/images/M/MV5BMjI5ODk1NzA2OV5BMl5BanBnXkFtZTgwNzM3NjQ0MDE@._V1_.jpg",
        serie4:"Under the Dome", img4:"https://images-na.ssl-images-amazon.com/images/M/MV5BMjA3NDk0NzM1MF5BMl5BanBnXkFtZTcwOTYxMTk3OQ@@._V1_.jpg",
        serie5:"V", img5:"https://images-na.ssl-images-amazon.com/images/M/MV5BMTYxNTQ5NTg2Ml5BMl5BanBnXkFtZTcwODUyNTY5Mg@@._V1_.jpg"
    }
];
    $('#comentario').trigger('autoresize');
    window.setInterval(function () {
        $('.carousel').carousel('next')
    }, 5000);
})

.controller('CriticasCtrl', function ($scope, UrlGetService) {
    $scope.titulo = "Críticas";
    var json = "http://localhost:9090/Projeto-MySeries/mock/dadosCritica.json";
    UrlGetService.getUrl(json).then(function (response) {
        $scope.listaCritica = response.data;
        $scope.qtdCriticas = response.data.length;
    });
})

.controller('DetalheSerieCtrl', function ($scope, $rootScope, EpisodesService, IdImdbService) {
    $rootScope.$on("buscarEpisodio", function () {
        $scope.buscarEpisodio();
    });

    $scope.buscarEpisodio = function () {
        id = IdImdbService.getProperty();
        var url = "http://www.omdbapi.com/?apikey=6b754581&i=" + id;
        EpisodesService.getUrl(url).then(function (response) {
            console.log(url);
            console.log(response);
            $('#modaldetalhe').modal('open')
            $scope.tituloEpisodio = response.data.Title;
            $scope.lancadoEpisodio = response.data.Released;
            $scope.seasonEpisodio = response.data.Season;
            $scope.seasonEp = response.data.Episodio;
            $scope.posterEpisodio = response.data.Poster;
            $scope.sinopseEpisodio = response.data.Plot;
            $scope.idImdb = id;
        });
    }

    $scope.fecharModal = function () {
        $('#modaldetalhe').modal('close');
    }
})

.controller('CadastroCtrl', function ($scope, $timeout, cfpLoadingBar, $location, $rootScope){
    $scope.titulo = "Cadastro";
    var vm = this;
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 100, // Creates a dropdown of 15 years to control year
        monthsFull:['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
        weekdaysShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        today: 'Hoje',
        clear: 'Limpar',
        close: 'Fechar',
        format: 'dd/mm/yyyy'
    })

    $scope.enviarCadastro = function(){
        cfpLoadingBar.start();
        $timeout(function () {
            cfpLoadingBar.complete();
            $location.url("/");
            Materialize.toast('Usuário cadastrado com sucesso!', 4000);
        }, 3000);
        delete vm;

    }

    $scope.limpar = function(){
        vm = {};
    }
})