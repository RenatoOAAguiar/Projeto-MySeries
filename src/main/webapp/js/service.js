angular.module('MySeries')                                                                                                                                                                        
.service("UrlGetService", function($http) { 
     return {getUrl : function(url){
        return $http({
                method: 'GET',
                url: url
                });
     }}
})

.service("EpisodesService", function($http){
     return {getUrl : function(url){
             return $http({
                method: 'GET',
                url: url
             });
     }}
})

.service('IdImdbService', function() {
  var idImdb = '';

        return {
            getProperty: function () {
                return idImdb;
            },
            setProperty: function(value) {
                idImdb = value;
            }
        }; 
});