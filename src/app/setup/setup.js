angular.module('setup', [], [ '$routeProvider', function($routeProvider) {

	$routeProvider.when('/setup', {
		templateUrl : 'setup/setup.tpl.html',
		controller : 'setupCtrl'
	}).when('/setup/profession', {
        templateUrl : 'setup/profession.tpl.html',
        controller : 'setupCtrl'
    }).when('/setup/taxes', {
        templateUrl : 'setup/taxes.tpl.html',
        controller : 'setupCtrl'
    }).when('/setup/deduction', {
        templateUrl : 'setup/deduction.tpl.html',
        controller : 'setupCtrl'
   }).when('/setup/review', {
        templateUrl : 'setup/review.tpl.html',
        controller : 'setupCtrl'
    }).when('/setup/finish', {
        templateUrl : 'setup/finish.tpl.html',
        controller : 'setupCtrl'
    });


} ]);

angular.module('setup').controller('setupCtrl',
[ '$scope', function($scope) {

} ]);