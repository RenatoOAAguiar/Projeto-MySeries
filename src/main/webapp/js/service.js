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
});