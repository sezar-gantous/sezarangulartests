'use strict';

/* Filters */

angular.module('phonecatFilters', [])

.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
})

.filter('whatsNextFilter', function() {
    return function( items, typeFiler ) {
       return _.select(items, function(videos){ return videos.type == typeFiler && videos.watched == false});
        
    }

})

.filter('whatsNextWatchedOnlyFilter', function() {
    return function( items) {
       return _.select(items, function(movies,i){ 
                 return _.select(movies,function(video){return video.watched == false});
         });
       /*var notCompleted = {};
            angular.forEach(items, function (video, id) {
                  
              if (video.type == typeFiler) {
               
                notCompleted[id] = video;
              }
              
            });
            return notCompleted;*/
            console.log(items);
    }
    
  })


.filter('whatsNextAllShowsOrMoviesFilter', function() {
    return function( items, typeFiler ) {
       //return _.select(items, function(videos){ return videos.type == typeFiler });
       var notCompleted = {};
            angular.forEach(items, function (video, id) {
                  
              if (video.type == typeFiler) {
               
                notCompleted[id] = video;
              }
              
            });
            return notCompleted;
    }
    
  });
    
   
