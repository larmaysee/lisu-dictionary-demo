'use strict';
var dictionary = angular.module('dictionary', [
	'ui.router',
	'oc.lazyLoad'
]);

var dictionary_run = dictionary.run([
	'$rootScope',
	'$state',
	'$stateParams',
	'$http',
	function($rootScope, $state, $stateParams, $http) {
		console.log(' .. app run application ..');

		console.log("APPLICATION STARTING ...");
	}
]);