

describe('module', function () {
    before(function () {
        console.log('Pre something');
    });
    describe('limit', function () {
        it('limit should success', function () {
            lib.limit(10);
        });
    });
    after(function () {
        console.log('Post something');
    });
});
