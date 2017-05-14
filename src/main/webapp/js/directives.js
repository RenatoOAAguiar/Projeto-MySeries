angular.module("MySeries").directive("dadosPerfil", function(){
        return{
            link: function ($scope, iElement, iAttrs){
                var elementos = angular.element('<li class="bold"><a href="#!" class="waves-effect waves-teal">Nome: Jake Sully</a></li>');
                iElement.html(elementos)
            }
        }
})

.directive('dadosSerie', function() {
    return {
      templateUrl: 'templates/serie.html'
    };
});