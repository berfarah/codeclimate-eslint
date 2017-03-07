var eslint = require("eslint");
var expect = require("chai").expect;

describe('eslint-patch', function() {
  it('intercept plugins', function() {
    var Plugins = require('eslint/lib/config/plugins');
    var loadAll = Plugins.loadAll;

    var patch = require("../lib/eslint-patch");
    patch(eslint);

    expect(loadAll).to.not.equal(Plugins.loadAll, 'Plugins.loadAll is not patched');
  });
});
