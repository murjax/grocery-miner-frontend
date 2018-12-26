import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | item/monthly', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:item/monthly');
    assert.ok(route);
  });
});
