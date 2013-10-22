'use strict';

/* App Module */

angular.module('phonecat', ['phonecatFilters', 'phonecat.services','phonecat.controllers','firebase']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/phones', {templateUrl: 'partials/phone-list.html',   controller: 'PhoneListCtrl'}).
      when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: 'PhoneDetailCtrl'}).
      when('/todoApp', {templateUrl: 'partials/todo-partial.html', controller: 'TodoCtrl'}).
      when('/whatsnext', {templateUrl: 'partials/whatsnext-partial.html', controller: 'whatsnextCtrl'}).
      when('/', {templateUrl: 'partials/index-partial.html', controller: 'IndexCtrl'}).
      otherwise({redirectTo: '/index.html'});
}]);
