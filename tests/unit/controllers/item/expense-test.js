import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | item/expense', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const controller = this.owner.lookup('controller:item/expense');
    assert.ok(controller);
  });
});
