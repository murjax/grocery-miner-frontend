import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit } from '@ember/test-helpers';
import moment from 'moment';
import { selectChoose } from 'ember-power-select/test-support';

module('Acceptance | purchase/total-per-month', hooks => {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('total purchases per month report', async function(assert) {
    const name = 'Apples';
    const firstPrice = '12.50';
    const secondPrice = '12.75';
    const purchaseDate = moment().format('MM-DD-YYYY');
    const item = this.server.create('item', { name });

    this.server.create('purchase', { item, price: firstPrice, purchaseDate });
    this.server.create('purchase', { item, price: secondPrice, purchaseDate });
    this.server.create('purchase', {
      item,
      price: secondPrice,
      purchaseDate: moment().subtract(2, 'months').format('MM-DD-YYYY')
    });

    await visit('purchase/total-per-month');
    assert.dom('*').includesText(name);
    assert.dom('*').includesText(parseFloat(firstPrice) + parseFloat(secondPrice));
    assert.dom('*').includesText('3');
  });

  test('selecting a different month', async function(assert) {
    const name = 'Apples';
    const firstPrice = '12.50';
    const secondPrice = '12.75';
    const purchaseDate = moment().format('MM-DD-YYYY');
    const item = this.server.create('item', { name });

    this.server.create('purchase', { item, price: firstPrice, purchaseDate });
    this.server.create('purchase', { item, price: secondPrice, purchaseDate });
    this.server.create('purchase', {
      item,
      price: secondPrice,
      purchaseDate: moment('12/12/2012').format('MM-DD-YYYY')
    });

    await visit('purchase/total-per-month');
    await selectChoose('.month-select', '12');
    await selectChoose('.year-select', '2012');

    assert.dom('*').includesText(name);
    assert.dom('*').includesText(secondPrice);
    assert.dom('*').includesText('2');
  });

  test('empty total per month report', async function(assert) {
    await visit('/purchase/total-per-month');
    assert.dom('*').includesText('Name');
    assert.dom('*').includesText('Price');
    assert.dom('*').includesText('Count');
  });
});
