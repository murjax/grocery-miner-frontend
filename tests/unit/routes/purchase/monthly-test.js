import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | purchase/monthly', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:purchase/monthly');
    assert.ok(route);
  });
});
