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



angular.module('phonecat.controllers', ['ui']).
  controller('IndexCtrl', [function() {

  }])
  .controller('PhoneDetailCtrl', [function($scope, $routeParams, Phone) {

    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
    $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }

  }])
  .controller('PhoneListCtrl', [function($scope, Phone) {

      $scope.phones = Phone.query();
      $scope.orderProp = 'age';

  }])
  .controller('TodoCtrl',function($scope,$http,todosF){


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

	        //update json
	        todosF.update($scope.todos,
            function (data) {
                $scope.todos = data; // since backend send the updated user back
            });
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
  });


 function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}