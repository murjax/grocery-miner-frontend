import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit } from '@ember/test-helpers';
import moment from 'moment';
import { selectChoose } from 'ember-power-select/test-support';

module('Acceptance | item/expense', hooks => {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('expense report defaults to 30 day range', async function(assert) {
    const expensiveItemName = 'Apples';
    const expensiveItemPrice = '135.50';
    const expensiveItemPurchaseDate = moment().format('MM-DD-YYYY');
    this.server.create('item',
      { name: expensiveItemName,
        price: expensiveItemPrice,
        purchaseDate: expensiveItemPurchaseDate
      });
    const cheapItemName = 'Oranges';
    const cheapItemPrice = '13.50';
    const cheapItemPurchaseDate = moment().format('MM-DD-YYYY');
    this.server.create('item',
      { name: cheapItemName,
        price: cheapItemPrice,
        purchaseDate: cheapItemPurchaseDate
      });

    this.server.create('item',
      { price: '45.50',
        purchaseDate: cheapItemPurchaseDate
      });

    this.server.create('item',
      { price: '45.50',
        purchaseDate: cheapItemPurchaseDate
      });

    this.server.create('item',
      { price: '45.50',
        purchaseDate: cheapItemPurchaseDate
      });

    this.server.create('item',
      { price: '45.50',
        purchaseDate: cheapItemPurchaseDate
      });

    const oldExpensiveItemName = 'Chicken';
    const oldExpensiveItemPrice = '235.50';
    const oldExpensiveItemPurchaseDate = moment().subtract(2, 'months').format('MM-DD-YYYY');
    this.server.create('item',
      { name: oldExpensiveItemName,
        price: oldExpensiveItemPrice,
        purchaseDate: oldExpensiveItemPurchaseDate
      });

    await visit('/item/expense');

    assert.dom('*').includesText(expensiveItemName);
    assert.dom('*').includesText(expensiveItemPrice);
    assert.dom('*').includesText(expensiveItemPurchaseDate);

    assert.dom('*').doesNotIncludeText(oldExpensiveItemName);
    assert.dom('*').doesNotIncludeText(oldExpensiveItemPrice);
    assert.dom('*').doesNotIncludeText(oldExpensiveItemPurchaseDate);

    assert.dom('*').doesNotIncludeText(cheapItemName);
    assert.dom('*').doesNotIncludeText(cheapItemPrice);
  });

  test('selecting a range', async function(assert) {
    const expensiveItemName = 'Apples';
    const expensiveItemPrice = '135.50';
    const expensiveItemPurchaseDate = moment().format('MM-DD-YYYY');
    this.server.create('item',
      { name: expensiveItemName,
        price: expensiveItemPrice,
        purchaseDate: expensiveItemPurchaseDate
      });
    const cheapItemName = 'Oranges';
    const cheapItemPrice = '13.50';
    const cheapItemPurchaseDate = moment().format('MM-DD-YYYY');
    this.server.create('item',
      { name: cheapItemName,
        price: cheapItemPrice,
        purchaseDate: cheapItemPurchaseDate
      });

    this.server.create('item',
      { price: '45.50',
        purchaseDate: cheapItemPurchaseDate
      });

    this.server.create('item',
      { price: '45.50',
        purchaseDate: cheapItemPurchaseDate
      });

    this.server.create('item',
      { price: '45.50',
        purchaseDate: cheapItemPurchaseDate
      });

    this.server.create('item',
      { price: '45.50',
        purchaseDate: cheapItemPurchaseDate
      });

    const oldExpensiveItemName = 'Chicken';
    const oldExpensiveItemPrice = '235.50';
    const oldExpensiveItemPurchaseDate = moment().subtract(2, 'months').format('MM-DD-YYYY');
    this.server.create('item',
      { name: oldExpensiveItemName,
        price: oldExpensiveItemPrice,
        purchaseDate: oldExpensiveItemPurchaseDate
      });

    await visit('/item/expense');

    assert.dom('*').includesText(expensiveItemName);
    assert.dom('*').includesText(expensiveItemPrice);
    assert.dom('*').includesText(expensiveItemPurchaseDate);

    assert.dom('*').doesNotIncludeText(oldExpensiveItemName);
    assert.dom('*').doesNotIncludeText(oldExpensiveItemPrice);
    assert.dom('*').doesNotIncludeText(oldExpensiveItemPurchaseDate);

    assert.dom('*').doesNotIncludeText(cheapItemName);
    assert.dom('*').doesNotIncludeText(cheapItemPrice);

    await selectChoose('.range-select', '90');

    assert.dom('*').includesText(oldExpensiveItemName);
    assert.dom('*').includesText(oldExpensiveItemPrice);
    assert.dom('*').includesText(oldExpensiveItemPurchaseDate);
  });
});
