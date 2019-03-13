import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setProperties } from '@ember/object';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Table from 'ember-light-table';

module('Integration | Component | basic-table', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders an ember light table', async function(assert) {
    const columns = [
      {
        label: 'Name',
        valuePath: 'name',
      },
      {
        label: 'Price',
        valuePath: 'price',
      },
    ];

    const name = 'Model Name';
    const price = '12.75';
    const model = { name, price };
    const table = new Table(columns, [model]);
    setProperties(this, { table });
    await render(hbs`{{basic-table table}}`);
    assert.dom('thead').includesText('Name');
    assert.dom('thead').includesText('Price');
    assert.dom('tbody').includesText(name);
    assert.dom('tbody').includesText(price);
  });
});
