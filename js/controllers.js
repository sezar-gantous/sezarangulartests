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

           $scope.unwatchedMoviesFilter = "Movie";
           $scope.unwatchedShowsFilter = "Show";
            $scope.WatchedAll = false;
           $scope.isCollapsed = true;
           $scope.newMovieText = '';
           $scope.orderProp = 'date';

           $scope.addMovie = function() {

              if(!isBlank($scope.newMovieText) )
                {
                  //$scope.todos.push({text:$scope.todoText, done:false});
                  
                  $scope.whatsnexts[new Firebase(url).push().name()] = {
                    type:"Movie",
                    name: $scope.newMovieText,
                    date:$scope.dt.toDateString(),
                    watched: false
                  };

                  $scope.newMovieText = '';
                  $scope.isCollapsed = true;
                }
              };

               $scope.addShow = function() {

              if(!isBlank($scope.newShowText) )
                {
                  //$scope.todos.push({text:$scope.todoText, done:false});
                  
                  $scope.whatsnexts[new Firebase(url).push().name()] = {
                    type:"Show",
                    name: $scope.newShowText,
                    season: $scope.newShowSeasonText,
                    episode: $scope.newShowEpisodeText,
                    date:$scope.dt.toDateString(),
                    watched: false
                  };

                  $scope.newShowText = '';
                  $scope.newShowSeasonText = '';
                  $scope.newShowEpisodeText ='';
                  $scope.isCollapsed = true;
                }
              };

               
              $scope.remaining = function(input) {
                  return _.size( _.select($scope.whatsnexts, function(video){ return video.type == input && video.watched == false;}) );
              };


              $scope.total = function(input) {
                  return _.size(_.select($scope.whatsnexts, function(video){ return video.type == input})  );
              };
               
              $scope.clearWatched = function(type) {
              //var oldwhatsnexts = _.select($scope.whatsnexts, function(video){ return video.type == type});
               /*   $scope.whatsnexts = {};
                
                angular.forEach(oldwhatsnexts, function(todo) {
                 if (!todo.done) $scope.whatsnexts.push(todo);
                });*/

                  var notCompleted = {};
                        angular.forEach($scope.whatsnexts, function (video, id) {
                              
                          if (video.type == type ) {
                            if(!video.watched)
                            notCompleted[id] = video;
                          }
                          else
                          {
                            notCompleted[id] = video;
                          }
                        });
                        $scope.whatsnexts = notCompleted;

              };

              $scope.removeWhatsNext = function(id,type,name)
              {
                //var oldwhatsnexts = _.reject($scope.whatsnexts, function(video){return video.type == type && video.name == name});
/*                var temp = {};
                var i = 0;

                angular.forEach($scope.whatsnexts, function(video,_id) {
                  //console.log("id:"+id +" _id:" + _id);
                  if(video.type==type)
                  {
                    if(id != i)
                    {
                       temp[_id]=video;
                    } 
                    i++;
                  }
                  else
                  {
                    temp[_id]= video;
                  }
                  
                });

                $scope.whatsnexts = temp;*/
                //console.log(oldwhatsnexts);
                //oldwhatsnexts.splice(id,1);
                //con sole.log(oldwhatsnexts);
                delete $scope.whatsnexts[id];

              };


              $scope.whatchedAll = function(type)
              {
                var notCompleted = {};
                        angular.forEach($scope.whatsnexts, function (video, id) {
                          if (video.type == type) {
                            video.watched = !$scope.WatchedAll;
                            notCompleted[id] = video;
                          }
                          else
                          {
                            notCompleted[id] = video;
                          }
                        });
                        $scope.whatsnexts = notCompleted;
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

    var url = 'https://whats-next.firebaseio.com/';
 
   if ($location.path() === '') {
       $location.path('/');
   }
   $scope.location = $location;

   angularFire(url, $scope, 'whatsnexts', {}).then(function () {
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