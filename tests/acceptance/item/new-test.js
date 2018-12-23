import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import {
  visit,
  click,
  fillIn
} from '@ember/test-helpers';
import moment from 'moment';

module('Acceptance | item/new', hooks => {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('creating multiple items', async function(assert) {
    const firstItemName = 'Apples';
    const firstItemPrice = '12.50';
    const firstItemPurchaseDate = '12/12/2012';
    const firstItemFormattedPurchaseDate = moment(firstItemPurchaseDate).format('YYYY-MM-DD');

    const secondItemName = 'Oranges';
    const secondItemPrice = '13.50';
    const secondItemPurchaseDate = '12/12/2013';
    const secondItemFormattedPurchaseDate = moment(secondItemPurchaseDate).format('YYYY-MM-DD');

    await visit('/item/new');
    await fillIn('#name', firstItemName);
    await fillIn('#price', firstItemPrice);
    await click('#price');
    await fillIn('#purchase-date', firstItemPurchaseDate);

    await click('.add-item');

    await fillIn('#name', secondItemName);
    await fillIn('#price', secondItemPrice);
    await fillIn('#purchase-date', secondItemPurchaseDate);

    await click('.add-item');

    await click('.submit');
    assert.equal(this.server.schema.items.all().length, 2);
    const firstItem = this.server.schema.items.first();
    const secondItem = this.server.schema.items.find(2);

    assert.equal(firstItem.name, firstItemName);
    assert.equal(firstItem.price, firstItemPrice);
    assert.equal(firstItem.purchaseDate, firstItemFormattedPurchaseDate);

    assert.equal(secondItem.name, secondItemName);
    assert.equal(secondItem.price, secondItemPrice);
    assert.equal(secondItem.purchaseDate, secondItemFormattedPurchaseDate);
  });
});
