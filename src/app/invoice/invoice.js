
angular.module('invoice', ['resources.invoice', 'directives.views'], [ '$routeProvider', function($routeProvider) {

    $routeProvider.when('/invoice/new', {
        templateUrl : 'invoice/invoice-new.tpl.html',
        controller : 'invoiceNewCtrl'
    }).when('/invoice/list', {
        templateUrl : 'invoice/invoice-list.tpl.html',
        controller : 'invoiceListCtrl'
    }).when('/invoice/:invoiceId', {
        templateUrl : 'invoice/invoice-view.tpl.html',
        controller : 'invoiceViewCtrl'
    });

} ]);

angular.module('invoice').controller('invoiceNewCtrl',
[ '$scope', function($scope) {

}]);

angular.module('invoice').controller('invoiceListCtrl',
[ '$scope', 'InvoiceResource', function($scope, InvoiceResource) {
    $scope.invoices = InvoiceResource.query();
    $scope.orderProp = 'age';

$scope.myData = [{name: "Moroni", age: 50},
                     {name: "Tiancum", age: 43},
                     {name: "Jacob", age: 27},
                     {name: "Nephi", age: 29},
                     {name: "Enos", age: 34}];
    $scope.gridOptions = { data: 'myData' };

}]);

angular.module('invoice').controller('invoiceViewCtrl',
[ '$scope', function($scope) {

}]);
