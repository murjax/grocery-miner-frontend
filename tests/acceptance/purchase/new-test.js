import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import {
  visit,
  click,
  fillIn
} from '@ember/test-helpers';
import Response from 'ember-cli-mirage/response';
import config from '../../../config/environment';
import moment from 'moment';

module('Acceptance | purchase/new', hooks => {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('creating multiple purchases', async function(assert) {
    const firstPurchaseName = 'Apples';
    const firstPurchasePrice = '12.50';
    const firstPurchasePurchaseDate = '12/12/2012';
    const firstPurchaseFormattedPurchaseDate = moment(firstPurchasePurchaseDate).format('YYYY-MM-DD');

    const secondPurchaseName = 'Oranges';
    const secondPurchasePrice = '13.50';
    const secondPurchasePurchaseDate = '12/12/2013';
    const secondPurchaseFormattedPurchaseDate = moment(secondPurchasePurchaseDate).format('YYYY-MM-DD');

    await visit('/purchase/new');
    await fillIn('.ember-power-select-typeahead-input', firstPurchaseName);
    await fillIn('#price input', firstPurchasePrice);
    await click('#price input');
    await fillIn('#purchase-date', firstPurchasePurchaseDate);

    await click('.add-purchase');

    await fillIn('.ember-power-select-typeahead-input', secondPurchaseName);
    await fillIn('#price input', secondPurchasePrice);
    await fillIn('#purchase-date', secondPurchasePurchaseDate);

    await click('.add-purchase');

    await click('.submit');
    assert.equal(this.server.schema.purchases.all().length, 2);
    const firstPurchase = this.server.schema.purchases.first();
    const secondPurchase = this.server.schema.purchases.find(2);

    assert.equal(firstPurchase.item.name, firstPurchaseName);
    assert.equal(firstPurchase.price, firstPurchasePrice);
    assert.equal(firstPurchase.purchaseDate, firstPurchaseFormattedPurchaseDate);

    assert.equal(secondPurchase.item.name, secondPurchaseName);
    assert.equal(secondPurchase.price, secondPurchasePrice);
    assert.equal(secondPurchase.purchaseDate, secondPurchaseFormattedPurchaseDate);
  });

  test('new item fails to save', async function(assert) {
    this.server.post(`${config.host}/items`, () => {
      return new Response(422, {}, {
        "errors": []
      });
    });

    const purchaseName = 'Apples';
    const purchasePrice = '12.50';
    const purchaseDate = '12/12/2012';

    await visit('/purchase/new');
    await fillIn('.ember-power-select-typeahead-input', purchaseName);
    await fillIn('#price input', purchasePrice);
    await click('#price input');
    await fillIn('#purchase-date', purchaseDate);

    await click('.add-purchase');

    await click('.submit');
    assert.equal(this.server.schema.purchases.all().length, 0);
  });
});
