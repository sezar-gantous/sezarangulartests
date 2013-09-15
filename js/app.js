'use strict';

/* App Module */

angular.module('phonecat', ['phonecatFilters', 'phonecatServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/index', {templateUrl: 'partials/index-partial.html' controller: IndexCtrl}).
      when('/phones', {templateUrl: 'partials/phone-list.html',   controller: PhoneListCtrl}).
      when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
      when('/todoApp', {templateUrl: 'partials/todo-partial.html', controller: 'TodoCtrl'}).
      otherwise({redirectTo: '/index'});
}]);
