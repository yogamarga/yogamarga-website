angular.module('dashboard', [], [ '$routeProvider', function($routeProvider) {

	$routeProvider.when('/dashboard', {
		templateUrl : 'dashboard/dashboard.tpl.html',
		controller : 'DashboardCtrl'
	});
} ]);

angular.module('dashboard').controller('DashboardCtrl',
    [ '$scope', 'security', function($scope, security) {
        $scope.isAuthenticated = security.isAuthenticated;
} ]);