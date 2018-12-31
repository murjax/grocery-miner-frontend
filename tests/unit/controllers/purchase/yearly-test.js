import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | purchase/yearly', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const controller = this.owner.lookup('controller:purchase/yearly');
    assert.ok(controller);
  });
});
