angular.module('MySeries')

    .controller('SideNavCtrl', function ($scope, $location) {
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
        var url = "http://www.omdbapi.com/?t=" + nome + "&plot=full";
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
            var qtdEpisodios = 0;
            var assistidos = [];

            for (i = 1; i <= totalSeason; i++) {
                var urlSeason = "http://www.omdbapi.com/?t=" + $routeParams.nome + "&Season=" + i;
                EpisodesService.getUrl(urlSeason).then(function (response) {
                    episodios.push(response.data.Episodes);
                    qtdEpisodios += response.data.Episodes.length;
                    for (i = 0; i < response.data.Episodes.length; i++) {
                        assistidos.push(0);
                    }
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

        $scope.marcarAssistido = function (index) {
            var elemento = $('#assistido' + index);
            if ($scope.assistidos[index] == 0) {
                $scope.assistidos[index] = 1;
            } else {
                $scope.assistidos[index] = 0;
            }
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

    .controller('LoginCtrl', function ($scope, $timeout, cfpLoadingBar, $location) {
        $scope.login = function () {
            cfpLoadingBar.start();
            $timeout(function () {
                cfpLoadingBar.complete();
                $('#userSettings').removeClass('hide');
                $('#linkLogin').addClass('hide');
                $('#linkSair').removeClass('hide');
                $('#modal1').modal('close');
                $scope.habilitarPerfil();
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
        });
    })

    .controller('DetalheSerieCtrl', function ($scope, $rootScope, EpisodesService, IdImdbService) {
        $rootScope.$on("buscarEpisodio", function () {
            $scope.buscarEpisodio();
        });

        $scope.buscarEpisodio = function () {
            id = IdImdbService.getProperty();
            var url = "http://www.omdbapi.com/?i=" + id;
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