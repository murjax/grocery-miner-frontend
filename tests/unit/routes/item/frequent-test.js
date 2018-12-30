import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | item/frequent', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:item/frequent');
    assert.ok(route);
  });
});
