import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | item/yearly', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const controller = this.owner.lookup('controller:item/yearly');
    assert.ok(controller);
  });
});
