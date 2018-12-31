import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit } from '@ember/test-helpers';
import moment from 'moment';
import { selectChoose } from 'ember-power-select/test-support';

module('Acceptance | purchase/monthly', hooks => {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('monthly expenditure report defaults to this month', async function(assert) {
    const thisMonthName = 'Apples';
    const thisMonthPrice = '13.50';
    const thisMonthPurchaseDate = moment().format('MM-DD-YYYY');
    this.server.create('purchase',
      { name: thisMonthName,
        price: thisMonthPrice,
        purchaseDate: thisMonthPurchaseDate
      });

    const lastMonthName = 'Oranges';
    const lastMonthPrice = '14.50';
    const lastMonthPurchaseDate = moment().subtract(1, 'months').format('MM-DD-YYYY');
    this.server.create('purchase',
      {
        name: lastMonthName,
        price: lastMonthPrice,
        purchaseDate: lastMonthPurchaseDate
      });

    await visit('/purchase/monthly');

    assert.dom('*').includesText(thisMonthName);
    assert.dom('*').includesText(thisMonthPrice);
    assert.dom('*').includesText(thisMonthPurchaseDate);

    assert.dom('*').doesNotIncludeText(lastMonthName);
    assert.dom('*').doesNotIncludeText(lastMonthPrice);
    assert.dom('*').doesNotIncludeText(lastMonthPurchaseDate);
  });

  test('monthly expenditure report with date params', async function(assert) {
    const thisMonthName = 'Apples';
    const thisMonthPrice = '13.50';
    const thisMonthPurchaseDate = moment().format('MM-DD-YYYY');
    this.server.create('purchase',
      { name: thisMonthName,
        price: thisMonthPrice,
        purchaseDate: thisMonthPurchaseDate
      });

    const otherMonthName = 'Oranges';
    const otherMonthPrice = '14.50';
    const otherMonthPurchaseDate = '11-06-2012';
    this.server.create('purchase',
      {
        name: otherMonthName,
        price: otherMonthPrice,
        purchaseDate: otherMonthPurchaseDate
      });

    await visit('/purchase/monthly');
    const otherMonthString = '11';
    const otherYearString = '2012';
    await selectChoose('.month-select', otherMonthString);
    await selectChoose('.year-select', otherYearString);

    assert.dom('*').doesNotIncludeText(thisMonthName);
    assert.dom('*').doesNotIncludeText(thisMonthPrice);
    assert.dom('*').doesNotIncludeText(thisMonthPurchaseDate);

    assert.dom('*').includesText(otherMonthName);
    assert.dom('*').includesText(otherMonthPrice);
    assert.dom('*').includesText(otherMonthPurchaseDate);
  });
});
