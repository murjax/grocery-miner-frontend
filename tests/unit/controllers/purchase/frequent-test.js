import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | purchase/frequent', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const controller = this.owner.lookup('controller:purchase/frequent');
    assert.ok(controller);
  });
});
