//jasmine template here

describe('view directive', function() {

    var $compile, $rootScope;

    beforeEach(module('directives.views'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('VIEW a "btn" class to the button element', function() {

    });

});