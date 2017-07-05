angular.module('MySeries')                                                                                                                                                                        
.service("UrlGetService", function($http) { 
     return {getUrl : function(url){
        return $http({
                method: 'GET',
                url: url
                });
     }}
})

.service("UrlPostService", function($http) { 
     return {getUrl : function(url, data){
        return $http({
                method: 'POST',
                url: url,
                data: data,
                headers: { 'Content-Type': 'application/json' }
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
})

.service('ListaEpisodiosService', function() {
  var listEp = [];

        return {
            getProperty: function () {
                return listEp;
            },
            setProperty: function(value) {
                listEp.push(value);
            }
        }; 
});