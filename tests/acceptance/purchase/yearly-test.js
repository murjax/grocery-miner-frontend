import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit } from '@ember/test-helpers';
import moment from 'moment';
import { selectChoose } from 'ember-power-select/test-support';

module('Acceptance | purchase/yearly', hooks => {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('yearly expenditure report defaults to this year', async function(assert) {
    const thisYearName = 'Apples';
    const thisYearPrice = '13.50';
    const thisYearPurchaseDate = moment().format('MM-DD-YYYY');
    this.server.create('purchase',
      { name: thisYearName,
        price: thisYearPrice,
        purchaseDate: thisYearPurchaseDate
      });

    const lastYearName = 'Oranges';
    const lastYearPrice = '14.50';
    const lastYearPurchaseDate = moment().subtract(1, 'years').format('MM-DD-YYYY');
    this.server.create('purchase',
      {
        name: lastYearName,
        price: lastYearPrice,
        purchaseDate: lastYearPurchaseDate
      });

    await visit('/purchase/yearly');

    assert.dom('*').includesText(thisYearName);
    assert.dom('*').includesText(thisYearPrice);
    assert.dom('*').includesText(thisYearPurchaseDate);

    assert.dom('*').doesNotIncludeText(lastYearName);
    assert.dom('*').doesNotIncludeText(lastYearPrice);
    assert.dom('*').doesNotIncludeText(lastYearPurchaseDate);
  });

  test('yearly expenditure report with date params', async function(assert) {
    const thisYearName = 'Apples';
    const thisYearPrice = '13.50';
    const thisYearPurchaseDate = moment().format('MM-DD-YYYY');
    this.server.create('purchase',
      { name: thisYearName,
        price: thisYearPrice,
        purchaseDate: thisYearPurchaseDate
      });

    const otherYearName = 'Oranges';
    const otherYearPrice = '14.50';
    const otherYearPurchaseDate = '11-06-2012';
    this.server.create('purchase',
      {
        name: otherYearName,
        price: otherYearPrice,
        purchaseDate: otherYearPurchaseDate
      });

    await visit('/purchase/yearly');
    const otherYearString = '2012';
    await selectChoose('.year-select', otherYearString);

    assert.dom('*').doesNotIncludeText(thisYearName);
    assert.dom('*').doesNotIncludeText(thisYearPrice);
    assert.dom('*').doesNotIncludeText(thisYearPurchaseDate);

    assert.dom('*').includesText(otherYearName);
    assert.dom('*').includesText(otherYearPrice);
    assert.dom('*').includesText(otherYearPurchaseDate);
  });
});
