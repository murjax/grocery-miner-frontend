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
    const thisYearPurchaseDateFormatted = moment(thisYearPurchaseDate).format('MM/DD/YYYY');
    const thisYearItem = this.server.create('item', { name: thisYearName });
    this.server.create('purchase',
      { item: thisYearItem,
        price: thisYearPrice,
        purchaseDate: thisYearPurchaseDate
      });

    const lastYearName = 'Oranges';
    const lastYearPrice = '14.50';
    const lastYearPurchaseDate = moment().subtract(1, 'years').format('MM-DD-YYYY');
    const lastYearPurchaseDateFormatted = moment(lastYearPurchaseDate).format('MM/DD/YYYY');
    const lastYearItem = this.server.create('item', { name: lastYearName });
    this.server.create('purchase',
      {
        item: lastYearItem,
        price: lastYearPrice,
        purchaseDate: lastYearPurchaseDate
      });

    await visit('/purchase/yearly');

    assert.dom('*').includesText(thisYearName);
    assert.dom('*').includesText(thisYearPrice);
    assert.dom('*').includesText(thisYearPurchaseDateFormatted);

    assert.dom('*').doesNotIncludeText(lastYearName);
    assert.dom('*').doesNotIncludeText(lastYearPrice);
    assert.dom('*').doesNotIncludeText(lastYearPurchaseDateFormatted);
  });

  test('yearly expenditure report pagination', async function(assert) {
    const thisYearName = 'Apples';
    const thisYearPrice = '13.50';
    const thisYearPurchaseDate = moment().format('MM-DD-YYYY');
    const thisYearItem = this.server.create('item', { name: thisYearName });

    this.server.createList(
      'purchase',
      26,
      {
        item: thisYearItem,
        price: thisYearPrice,
        purchaseDate: thisYearPurchaseDate
      }
    );

    await visit('/purchase/yearly');
    assert.dom('.pagination .active').includesText('1');
    assert.dom('.pagination').includesText('2');
  });

  test('including total price from meta', async function(assert) {
    const count = 3;
    const thisYearName = 'Apples';
    const thisYearPrice = '13.50';
    const thisYearPurchaseDate = moment().format('MM-DD-YYYY');
    const thisYearItem = this.server.create('item', { name: thisYearName });

    this.server.createList(
      'purchase',
      count,
      {
        item: thisYearItem,
        price: thisYearPrice,
        purchaseDate: thisYearPurchaseDate
      }
    );

    await visit('/purchase/monthly');
    const expectedTotal = parseFloat(thisYearPrice) * count;
    assert.dom('h4').includesText(expectedTotal);
  });

  test('yearly expenditure report with date params', async function(assert) {
    const thisYearName = 'Apples';
    const thisYearPrice = '13.50';
    const thisYearPurchaseDate = moment().format('MM-DD-YYYY');
    const thisYearPurchaseDateFormatted = moment(thisYearPurchaseDate).format('MM/DD/YYYY');
    const thisYearItem = this.server.create('item', { name: thisYearName });
    this.server.create('purchase',
      { item: thisYearItem,
        price: thisYearPrice,
        purchaseDate: thisYearPurchaseDate
      });

    const otherYearName = 'Oranges';
    const otherYearPrice = '14.50';
    const otherYearPurchaseDate = '11-06-2012';
    const otherYearPurchaseDateFormatted = '11/06/2012';
    const otherYearItem = this.server.create('item', { name: otherYearName });
    this.server.create('purchase',
      {
        item: otherYearItem,
        price: otherYearPrice,
        purchaseDate: otherYearPurchaseDate
      });

    await visit('/purchase/yearly');
    const otherYearString = '2012';
    await selectChoose('.year-select', otherYearString);

    assert.dom('*').doesNotIncludeText(thisYearName);
    assert.dom('*').doesNotIncludeText(thisYearPrice);
    assert.dom('*').doesNotIncludeText(thisYearPurchaseDateFormatted);

    assert.dom('*').includesText(otherYearName);
    assert.dom('*').includesText(otherYearPrice);
    assert.dom('*').includesText(otherYearPurchaseDateFormatted);
  });

  test('empty yearly report', async function(assert) {
    await visit('/purchase/yearly');
    assert.dom('*').includesText('Total: $0.00');
  });
});
