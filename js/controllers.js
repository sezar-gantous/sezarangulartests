'use strict';

/* Controllers */


/*
function IndexCtrl() {

}


function PhoneListCtrl($scope, Phone) {
  $scope.phones = Phone.query();
  $scope.orderProp = 'age';
}

//PhoneListCtrl.$inject = ['$scope', 'Phone'];



function PhoneDetailCtrl($scope, $routeParams, Phone) {
  $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
    $scope.mainImageUrl = phone.images[0];
  });

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }
}*/

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];



angular.module('phonecat.controllers', ['ui','ui.bootstrap']).
  controller('IndexCtrl', function() {

  })
  .controller('PhoneDetailCtrl',function($scope, $routeParams, Phone) {

    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
    $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }

  })
  .controller('PhoneListCtrl', function($scope, Phone) {

      $scope.phones = Phone.query();
      $scope.orderProp = 'age';

  })
  .controller('TodoCtrl',function($scope,$http/*,todosF*/){


 	/*$http.get('todos/todos.json').success(function(data) {
		$scope.todos = data;
		//alert("ok!");
	});*/


   $scope.todos =  [
    {text:'learn AngularJS', done:true},
     {text:'build this angular app', done:false}];
    
 $scope.todoText = '';

    $scope.addTodo = function() {

    	if(!isBlank($scope.todoText) )
	    {
	    	$scope.todos.push({text:$scope.todoText, done:false});
	        $scope.todoText = '';
/*
	        //update json
	        todosF.update($scope.todos,
            function (data) {
                $scope.todos = data; // since backend send the updated user back
            });*/
	    }
    };
     
    $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
    count += todo.done ? 0 : 1;
    });
    return count;
    };
     
    $scope.clearCompleted = function() {
	    var oldTodos = $scope.todos;
	    $scope.todos = [];
	    
	    angular.forEach(oldTodos, function(todo) {
	 	   if (!todo.done) $scope.todos.push(todo);
	    });
	};
  })
.controller('whatsnextCtrl',function($scope,$timeout, $location, angularFire){
     
     this.onDataLoaded = function onDataLoaded($scope, $location, url) {
           var whatsnexts = $scope.whatsnextsMovies;
           $scope.unwatchedMoviesFilter = "Movie";
           $scope.unwatchedShowsFilter = "Show";
            $scope.WatchedAll = false;
           $scope.isCollapsed = true;
           $scope.newMovieText = '';
           $scope.orderProp = 'date';
          // $scope.remainingShows = 0;
           $scope.remainingMovies = 0;
           $scope.totalMovies = 0;
         //  $scope.totalShows = 0;


           



           /*
            this code is for the datepicker
          */
             /* $scope.today = function() {
                $scope.dt = new Date();
              };
              $scope.today();

              $scope.showWeeks = true;
              $scope.toggleWeeks = function () {
                $scope.showWeeks = ! $scope.showWeeks;
              };

              $scope.clear = function () {
                $scope.dt = null;
              };

              // Disable weekend selection
              $scope.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
              };

              $scope.toggleMin = function() {
                $scope.minDate = ( $scope.minDate ) ? null : new Date();
              };
              $scope.toggleMin();

              $scope.open = function() {
                $timeout(function() {
                  $scope.opened = true;
                });
              };

               $scope.dateOptions = {
                 'year-format': "'yy'",
                 'starting-day': 1
                };
*/
           /**********************************************/


           
     };

    var url = 'https://whatsnextfamily.firebaseio.com/whatsnext';
 
   if ($location.path() === '') {
       $location.path('/');
   }
   $scope.location = $location;

   angularFire(url, $scope, "whatsnexts").then(function () {
     this.onDataLoaded($scope, $location, url);
    }.bind(this));

  })

.controller('whatsnextMovieCtrl',function($scope,$rootScope,$timeout, $location, angularFire){
     
     this.onDataLoaded = function onDataLoaded($scope, $location, url) {
           var whatsnexts = $scope.whatsnextsMovies;
           $scope.unwatchedMoviesFilter = "Movie";
           //$scope.unwatchedShowsFilter = "Show";
            $scope.WatchedAll = false;
           $scope.isCollapsed = true;
           $scope.newMovieText = '';
           $scope.orderProp = 'date';
          // $scope.remainingShows = 0;
           $scope.remainingMovies = 0;
           $scope.totalMovies = 0;
         //  $scope.totalShows = 0;


           $scope.$watch('whatsnextsMovies', function () {
              $scope.remainingMovies = $scope.remaining();   
              $scope.totalMovies = $scope.total();  
            }, true);



           $scope.addMovie = function() {

              if(!isBlank($scope.newMovieText) )
                {
                  //$scope.todos.push({text:$scope.todoText, done:false});
                  
                  /*$scope.whatsnexts[new Firebase(url).push().name()] = {
                    type:"Movie",
                    name: $scope.newMovieText,
                    date:$scope.dt.toDateString(),
                    watched: false
                  };*/
                  $scope.whatsnextsMovies.push(
                    {
                      type:"Movie",
                      name: $scope.newMovieText,
                      channel : $scope.channelText,
                      link : $scope.linkText,
                      date:$scope.dt,
                      watched: false
                    });  

                  $scope.newMovieText = '';
                  $scope.channelText='';
                  $scope.linkText = '';
                  $scope.isCollapsed = true;
                }
              };

            

               
              $scope.remaining = function() {
               // angular.forEach(whatsnexts, function(video){
                 // console.log(whatsnexts);
                //});
                  return _.size( _.select($scope.whatsnextsMovies, function(video){ return  video.watched == false}) );
              };


              $scope.total = function() {
                  return _.size($scope.whatsnextsMovies );
              };
              

              $scope.setFocus = function()
              {
                $("#AddMovie").focus();
              } 

              $scope.edit = function(movie){
                $rootScope.movie = movie;
              }

              $scope.clearWatched = function() {
              //var oldwhatsnexts = _.select($scope.whatsnexts, function(video){ return video.type == type});
                
                //angular.forEach(whatsnexts, function(todo) {
                 //if (!todo.done) $scope.whatsnexts.push(todo);
                 //console.log(todo.type);
               // });

                  //var notCompleted = {};
                   /*     angular.forEach($scope.whatsnexts, function (video, id) {
                              
                          if (video.type == type ) {
                            if(!video.watched)
                            notCompleted[id] = video;
                          }
                          else
                          {
                            notCompleted[id] = video;
                          }
                        });
                        */
                        //whatsnexts.splice(id,1);
                        var r=confirm("Are you sure you want to clear all watched movies?!");
                        if (r==true)
                          {
                           $scope.whatsnextsMovies = {}; 
                           ///console.log(whatsnexts);
                            $scope.whatsnextsMovies = _.reject(whatsnexts,function (movie) {return movie.watched});
                            //$scope.whatsnextsMovies = notCompleted;
                            //console.log(notCompleted);
                           // whatsnexts = {};
                           // whatsnexts = watchedMovies;
                          }
                       


              };

              $scope.removeWhatsNext = function(movie)
              {
                //var oldwhatsnexts = _.reject(whatsnexts, function(video){return video.type == type && video.name == name});
               /* var temp = {};
                var i = 0;

                angular.forEach(whatsnexts, function(video,_id) {
                  console.log("id:"+id +" _id:" + _id);
                 
                    if(id != i)
                    {
                       whatsnexts.splice(id,1);
                    } 
                    i++;
                 
                  
                }); */

               // $scope.whatsnexts = temp;
                    //$scope.whatsnexts = [];
                  // $scope.whatsnexts =  _.reject(whatsnexts, function(video){return video.id == id});
                   //whatsnexts = $scope.whatsnexts;
                console.log($scope.whatsnextsMovies);

                //var oldwhatsnexts = _.clone(whatsnexts);
                //console.log(oldwhatsnexts);

                $scope.whatsnextsMovies.splice( $scope.whatsnextsMovies.indexOf(movie),1);
                console.log( $scope.whatsnextsMovies);
                //console.log(oldwhatsnexts);
                //delete whatsnexts[id];

              };


              $scope.whatchedAll = function()
              {
                
                var notCompleted = {};
                        angular.forEach($scope.whatsnextsMovies, function (video, id) {
                          //if (video.type == type) {
                           
                            video.watched = !$scope.WatchedAll;
                           /* notCompleted[id] = video;
                          }
                          else
                          {
                            notCompleted[id] = video;
                          }*/
                        });
                        //$scope.whatsnextsMovies = notCompleted;
                        $scope.WatchedAll = !$scope.WatchedAll;
              }


           /*
            this code is for the datepicker
          */
              $scope.today = function() {
                $scope.dt = new Date();
              };
              $scope.today();

              $scope.showWeeks = true;
              $scope.toggleWeeks = function () {
                $scope.showWeeks = ! $scope.showWeeks;
              };

              $scope.clear = function () {
                $scope.dt = null;
              };

              // Disable weekend selection
              $scope.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
              };

              $scope.toggleMin = function() {
                $scope.minDate = ( $scope.minDate ) ? null : new Date();
              };
              $scope.toggleMin();

              $scope.open = function() {
                $timeout(function() {
                  $scope.opened = true;
                });
              };

               $scope.dateOptions = {
                 'year-format': "'yy'",
                 'starting-day': 1
                };

           /**********************************************/


           
     };

    var url = 'https://whatsnextfamily.firebaseio.com/whatsnext/movies';
 
   if ($location.path() === '') {
       $location.path('/');
   }
   $scope.location = $location;

   angularFire(url, $scope, "whatsnextsMovies").then(function () {
     this.onDataLoaded($scope, $location, url);
    }.bind(this));

  })
   
   .controller('whatsnextShowCtrl',function($scope,$rootScope,$timeout, $location, angularFire){
     
     this.onDataLoaded = function onDataLoaded($scope, $location, url) {
          
          var whatsnexts = $scope.whatsnextsShows;
           $scope.unwatchedShowsFilter = "Show";
           $scope.WatchedAll = false;
           $scope.isCollapsed = true;

           $scope.newShowText = '';
           $scope.orderProp = 'date';
           $scope.remainingShows = 0;

          $scope.totalShows = 0;
          $scope.Time = null;


           $scope.$watch('whatsnextsShows', function () {


              $scope.remainingShows = $scope.remaining();
            
              $scope.totalShows = $scope.total();
        

             
             
            }, true);



               $scope.addShow = function() {

                    if(!isBlank($scope.newShowText) )
                      {

                        $scope.whatsnextsShows.push(
                          {
                            type:"Show",
                            name:    $scope.newShowText,
                            season:  $scope.newShowSeasonText,
                            episode: $scope.newShowEpisodeText,
                            channel: $scope.channelText,
                            link: $scope.linkText,
                            date:    $scope.dt,
                            watched: false
                          }); 

                        $scope.newShowText = '';
                        $scope.channelText ='';
                        $scope.linkText = '';
                        $scope.newShowSeasonText = '';
                        $scope.newShowEpisodeText ='';
                        $scope.Time = null;
                        $scope.isCollapsed = true;
                      }
              };

               
               $scope.remaining = function() {
               // angular.forEach(whatsnexts, function(video){
                 // console.log(whatsnexts);
                //});
                  return _.size( _.select($scope.whatsnextsShows, function(video){ return  video.watched == false}) );
              };


              $scope.total = function() {
                  return _.size($scope.whatsnextsShows );
              };
               
              $scope.clearWatched = function() {
                   var r=confirm("Are you sure you want to clear all watched Shows?!");
                     if (r==true)
                      {
                        $scope.whatsnextsShows = {}; 
                        $scope.whatsnextsShows = _.reject( whatsnexts,function (Show) {return Show.watched});
                     }
              };

              $scope.removeWhatsNext = function(show)
              {
                
                $scope.whatsnextsShows.splice( $scope.whatsnextsShows.indexOf(show),1);   
              };

              $scope.setFocus = function()
              {
                $("#AddShow").focus();
              }

              $scope.edit = function(show){
                $rootScope.show = show;
              }

              $scope.whatchedAll = function()
              {

               var notCompleted = {};
                        angular.forEach($scope.whatsnextsShows, function (video, id) {
                            video.watched = !$scope.WatchedAll;
                        });
                        
                        $scope.WatchedAll = !$scope.WatchedAll;

              }
           /*
            this code is for the datepicker
          */
              $scope.today = function() {
                $scope.dt = new Date();
              };
              $scope.today();

              $scope.showWeeks = true;
              $scope.toggleWeeks = function () {
                $scope.showWeeks = ! $scope.showWeeks;
              };

              $scope.clear = function () {
                $scope.dt = null;
              };

              // Disable weekend selection
              $scope.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
              };

              $scope.toggleMin = function() {
                $scope.minDate = ( $scope.minDate ) ? null : new Date();
              };
              $scope.toggleMin();

              $scope.open = function() {
                $timeout(function() {
                  $scope.opened = true;
                });
              };

               $scope.dateOptions = {
                 'year-format': "'yy'",
                 'starting-day': 1
                };

           /**********************************************/


          /*
            This code is for time picker
          */
          $scope.time = function () {
            $scope.mytime = new Date();

            $scope.hstep = 1;
            $scope.mstep = 15;

            $scope.options = {
              hstep: [1, 2, 3],
              mstep: [1, 5, 10, 15, 25, 30]
            };

            $scope.ismeridian = true;
            $scope.toggleMode = function() {
              $scope.ismeridian = ! $scope.ismeridian;
            };

            $scope.update = function() {
              var d = new Date();
              d.setHours( 14 );
              d.setMinutes( 0 );
              $scope.mytime = d;
            };

            $scope.changed = function () {
              $scope.Time = $scope.mytime;
              console.log('Time changed to: ' + $scope.mytime);
            };

            $scope.clear = function() {
              $scope.mytime = null;
            };
          };

          /****************************************/
           
     };

    var url = 'https://whatsnextfamily.firebaseio.com/whatsnext/shows';
 
   if ($location.path() === '') {
       $location.path('/');
   }
   $scope.location = $location;

   angularFire(url, $scope, "whatsnextsShows").then(function () {
     this.onDataLoaded($scope, $location, url);
    }.bind(this));

  })
   
   .controller('TabsCtrl',function($scope){
    $scope.tabs=[
    { title:"Whats Next ?", content:"/partials/tab1Content-partial.html", active:true},
    { title:"Movies", content: "/partials/tab2Content-partial.html"},
    { title:"Shows", content: "/partials/tab3Content-partial.html"}
    ];


   });


 function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}