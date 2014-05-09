
var translationsEN = {
  HEADLINE: 'What an awesome module!',
  PARAGRAPH: 'Srsly!',
  PASSED_AS_TEXT: 'Hey there! I\'m passed as text value!',
  PASSED_AS_ATTRIBUTE: 'I\'m passed as attribute value, cool ha?',
  PASSED_AS_INTERPOLATION: 'Beginners! I\'m interpolated!',
  VARIABLE_REPLACEMENT: 'Hi {{name}}',
  BUTTON_LANG_DE: 'german',
  BUTTON_LANG_EN: 'english',
  INVOICE: "Invoice",
  INVOICES: "Invoices",

    NAME: 'Name',
    PROFESSION: 'Profession',
    TAX_CODE: 'Tax Code',
    TAX_OFFICE: 'Tax Office',
    COUNTRY: 'Country',

    SETUP_WELCOME: "Welcome to Atheorita!",
    SETUP_GUIDE: "This guide will help you setup your account.",
    SETUP_INVOICING: "You will be invoicing in minutes...",
    SETUP_BUTTON_START: "Start Setup"
};

var translationsEL = {
    HEADLINE: "Was für ein großartiges Modul!",
    PARAGRAPH: "Ernsthaft!",
    PASSED_AS_TEXT: "Hey! Ich wurde als text übergeben!",
    PASSED_AS_ATTRIBUTE: "Ich wurde als Attribut übergeben, cool oder?",
    PASSED_AS_INTERPOLATION: "Anfänger! Ich bin interpoliert!",
    VARIABLE_REPLACEMENT: "Hi {{name}}",
    BUTTON_LANG_DE: "deutsch",
    BUTTON_LANG_EN: "englisch",
    INVOICE: "Τιμολόγιο",
    INVOICES: "Τιμολόγια",

    NAME: 'Name',
    PROFESSION: 'Profession',
    TAX_CODE: 'Tax Code',
    TAX_OFFICE: 'Tax Office',
    COUNTRY: 'Country',

    SETUP_WELCOME: "Welcome to Atheorita!",
    SETUP_GUIDE: "This guide will help you setup your account.",
    SETUP_INVOICING: "You will be invoicing in minutes...",
    SETUP_BUTTON_START: "Start Setup"
};


angular.module('app', [
  'ngRoute',
  'ngCookies',
  'ngGrid',
  'security',
  'ui.bootstrap',
  'pascalprecht.translate',
  'directives.views',
  'directives.form',
  'dashboard',
  'setup',
  'invoice',
  'templates.app',
  'templates.common'])

.config(
		[ '$routeProvider', '$locationProvider',
				function($routeProvider) {
					$routeProvider.otherwise({
						redirectTo : '/dashboard'
					});
				} ])
.config([
    '$interpolateProvider', function($interpolateProvider) {
        return $interpolateProvider.startSymbol('{(').endSymbol(')}');
    }
])

.config(['$translateProvider', function($translateProvider) {
//    $translateProvider.translations('en', translationsEN);
//    $translateProvider.translations('el', translationsEL);
    $translateProvider.useCookieStorage();

    // configures staticFilesLoader
    $translateProvider.useStaticFilesLoader({
        prefix: 'data/locale-',
        suffix: '.json'
    });

    // load 'en' table on startup
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escaped');
}])

.controller('AppCtrl', [ '$scope', '$translate', function($scope, $translate) {

    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
    };

}])

//TODO: move those messages to a separate module
.constant('I18N.MESSAGES', {
  'errors.route.changeError':'Route change error',
  'crud.user.save.success':"A user with id '{{id}}' was saved successfully.",
  'crud.user.remove.success':"A user with id '{{id}}' was removed successfully.",
  'crud.user.remove.error':"Something went wrong when removing user with id '{{id}}'.",
  'crud.user.save.error':"Something went wrong when saving a user...",
  'crud.project.save.success':"A project with id '{{id}}' was saved successfully.",
  'crud.project.remove.success':"A project with id '{{id}}' was removed successfully.",
  'crud.project.save.error':"Something went wrong when saving a project...",
  'login.reason.notAuthorized':"You do not have the necessary access permissions.  Do you want to login as someone else?",
  'login.reason.notAuthenticated':"You must be logged in to access this part of the application.",
  'login.error.invalidCredentials': "Login failed.  Please check your credentials and try again.",
  'login.error.serverError': "There was a problem with authenticating: {{exception}}."
})

.controller('HeaderCtrl', [ '$scope', function($scope) {


}]);
