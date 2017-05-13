angular.module('MySeries').controller('SideNavCtrl', function($scope){
});

angular.module('MySeries').controller('CarolselCtrl', function($scope){
    $scope.titulo = "Top Series";
});

angular.module('MySeries').controller('SerieCtrl', function($scope, $http){
    $scope.titulo = "Top Series";
    $scope.poster = '';
    var url = "http://www.omdbapi.com/?t=Lost&plot=full";
    var poster = '';
    $http({
        method: 'GET',
        url: url
    }).then(function successCallback(response) {
       poster = response.data.Poster;
       $scope.poster = poster;
    }, function errorCallback(response) {
       console.log(response);
    });
});

angular.module('MySeries').controller('LoginCtrl', function($scope, $timeout, cfpLoadingBar){
    $scope.login = function(){
        cfpLoadingBar.start();
        $timeout(function () {
            cfpLoadingBar.complete();
            $('#userSettings').removeClass('hide');
        }, 3000);
    }
});