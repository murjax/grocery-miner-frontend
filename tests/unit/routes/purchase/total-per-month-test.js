import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | purchase/total-per-month', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:purchase/total-per-month');
    assert.ok(route);
  });
});
