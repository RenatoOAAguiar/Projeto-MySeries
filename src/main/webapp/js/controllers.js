angular.module('MySeries')

.controller('SideNavCtrl', function ($scope, $location, $rootScope) {
    $rootScope.statusLogin = true;
    $scope.sair = function () {
        $('#userSettings').addClass('hide');
        $('#linkLogin').removeClass('hide');
        $('#linkSair').addClass('hide');
        $('#tabMinhasSeries').addClass('hide');
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
        $scope.qtdEpisodios = 0;
        var assistidos = [];
        $scope.indexAtual = -1;

        for (i = 1; i <= totalSeason; i++) {
            var urlSeason = "http://www.omdbapi.com/?apikey=6b754581&t=" + $routeParams.nome + "&Season=" + i;
            EpisodesService.getUrl(urlSeason).then(function (response) {
                response.data.Episodes.Season = response.data.Season;
                var tempArray = [];
                for (i = 0; i < response.data.Episodes.length; i++) {
                    response.data.Episodes[i].assistido = 0; 
                }
                episodios.push(response.data.Episodes);
                $scope.qtdEpisodios += response.data.Episodes.length;
            })
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

    $scope.marcarAssistido = function (index, temporada) {
        if (temporada[index].assistido == 0) {
            temporada[index].assistido = 1;
        } else {
            temporada[index].assistido = 0;
        }
    }

    //Banco de dados deve ter atributo inputando se o usuário já assistiu ou não todos episódios
    $scope.marcarDesmarcarTodos = function () {
        var that = this;
        var valor = $('#marcarTodos').val();
        if(valor == ''){
            valor = 0;
        }
        for (i = 0; i < this.episodios.length; i++) {
            for(y = 0; y < this.episodios[i].length; y++){
                var assit = this.episodios[i][y].assistido;
                if (assit == 0) {
                    this.episodios[i][y].assistido = 1;
                    valor = 1;
                } else {
                    this.episodios[i][y].assistido = 0;
                }
            }
        }
        if (valor == 0) {
            $('#marcarTodos').attr('src', $scope.desmarcar);
            $('#marcarTodos').val(1);
        } else {
            $('#marcarTodos').attr('src', $scope.marcar);
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
        $scope.comentario = null;
        Materialize.toast('Comentário Inserido com sucesso!', 4000);
    }

    //Recupera os comentários do arquivo JSON
    var json = "http://localhost:9090/Projeto-MySeries/mock/comentarios.json";
    UrlGetService.getUrl(json).then(function (response) {
        $scope.listaComentarios = response.data;
        $scope.qtdComentarios = response.data.length;
    })

})

.controller('LoginCtrl', function ($scope, $timeout, cfpLoadingBar, $location, $rootScope, UrlGetService) {
    $scope.login = function () {
        cfpLoadingBar.start();
        var json = "http://localhost:9090/Projeto-MySeries/mock/usuarios.json";
        UrlGetService.getUrl(json).then(function (response) {
            usuario = response.data;
            for(i =0; i < usuario.length; i++){
                if($scope.usuario == usuario[i].login && $scope.senha == usuario[i].senha){
                    var nome = usuario[i].nome;
                    $timeout(function () {
                        cfpLoadingBar.complete();
                        $('#userSettings').removeClass('hide');
                        $('#linkLogin').addClass('hide');
                        $('#linkSair').removeClass('hide');
                        $('#modal1').modal('close');
                        $('#tabMinhasSeries').removeClass('hide');
                        $scope.habilitarPerfil();
                        $rootScope.statusLogin = false;
                        Materialize.toast('Logado com sucesso! senha bem vindo ' + nome + '!', 4000);
                    }, 3000);
                    delete $scope.usuario;
                    delete $scope.senha;
                } else {
                    Materialize.toast('Usuário ou senha incorretos!', 4000);
                }
            }
        })
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

.controller('PrincipalCtrl', function ($scope, $compile, UrlGetService) {
    $scope.titulo = "Top Series";
    var json = "http://localhost:9090/Projeto-MySeries/mock/listaSeries.json";
    UrlGetService.getUrl(json).then(function (response) {
        $scope.listaSeries = response.data;
    });
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

    $scope.abrirCritica = function(id){
        var json = "http://localhost:9090/Projeto-MySeries/mock/dadosCritica.json";
        UrlGetService.getUrl(json).then(function (response) {
            for(i = 0; i < response.data.length; i++){
                if(response.data[i].idCritica == id){
                    $scope.descricao = response.data[i];
                    $('#modalCritica').modal('open');
                }
            }
        });
    }

    $scope.fecharModal = function () {
        $('#modalCritica').modal('close');
    }
})

.controller('DetalheSerieCtrl', function ($scope, $rootScope, EpisodesService, IdImdbService) {
    $rootScope.$on("buscarEpisodio", function () {
        $scope.buscarEpisodio();
    });

    $scope.buscarEpisodio = function () {
        id = IdImdbService.getProperty();
        var url = "http://www.omdbapi.com/?apikey=6b754581&i=" + id;
        EpisodesService.getUrl(url).then(function (response) {
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
    $scope.cadastro = {};
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
        $scope.formcadastro.$setPristine();
        delete vm;

    }
    var cad = angular.copy($scope.cadastro);

    $scope.limpar = function(){
        $scope.cadastro = angular.copy(cad);
        $scope.formcadastro.$setPristine();
        $('.datepicker').pickadate('clear');
    }
})