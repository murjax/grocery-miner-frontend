import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { setProperties } from '@ember/object';
import sinon from 'sinon';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | purchase-badge', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders badge with purchase name and price', async function(assert) {
    const name = 'Name';
    const price = '2.25';
    const purchase = { item: { name }, price };
    const spy = sinon.spy();

    setProperties(this, { purchase, spy });
    await render(hbs`{{purchase-badge purchase=purchase onDelete=spy}}`);
    assert.dom('*').includesText(name);
    assert.dom('*').includesText(price);
    await click('a');
    assert.ok(spy.calledOnce);
  });
});
