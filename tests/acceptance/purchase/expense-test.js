import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit } from '@ember/test-helpers';
import moment from 'moment';
import { selectChoose } from 'ember-power-select/test-support';

module('Acceptance | purchase/expense', hooks => {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('expense report defaults to 30 day range', async function(assert) {
    const expensivePurchaseName = 'Apples';
    const expensivePurchasePrice = '135.50';
    const expensivePurchasePurchaseDate = moment().format('MM-DD-YYYY');
    const expensiveItem = this.server.create('item', { name: expensivePurchaseName });
    this.server.create('purchase',
      { item: expensiveItem,
        price: expensivePurchasePrice,
        purchaseDate: expensivePurchasePurchaseDate
      });
    const cheapPurchaseName = 'Oranges';
    const cheapPurchasePrice = '13.50';
    const cheapPurchasePurchaseDate = moment().format('MM-DD-YYYY');
    const cheapItem = this.server.create('item', { name: cheapPurchaseName });
    this.server.create('purchase',
      { item: cheapItem,
        price: cheapPurchasePrice,
        purchaseDate: cheapPurchasePurchaseDate
      });

    const randomItem = this.server.create('item', { name: 'Random' });
    this.server.create('purchase',
      { item: randomItem,
        price: '45.50',
        purchaseDate: cheapPurchasePurchaseDate
      });

    this.server.create('purchase',
      { item: randomItem,
        price: '45.50',
        purchaseDate: cheapPurchasePurchaseDate
      });

    this.server.create('purchase',
      { item: randomItem,
        price: '45.50',
        purchaseDate: cheapPurchasePurchaseDate
      });

    this.server.create('purchase',
      { item: randomItem,
        price: '45.50',
        purchaseDate: cheapPurchasePurchaseDate
      });

    const oldExpensivePurchaseName = 'Chicken';
    const oldExpensivePurchasePrice = '235.50';
    const oldExpensivePurchasePurchaseDate = moment().subtract(2, 'months').format('MM-DD-YYYY');
    const oldExpensiveItem = this.server.create('item', { name: oldExpensivePurchaseName });
    this.server.create('purchase',
      { item: oldExpensiveItem,
        price: oldExpensivePurchasePrice,
        purchaseDate: oldExpensivePurchasePurchaseDate
      });

    await visit('/purchase/expense');

    assert.dom('*').includesText(expensivePurchaseName);
    assert.dom('*').includesText(expensivePurchasePrice);
    assert.dom('*').includesText(expensivePurchasePurchaseDate);

    assert.dom('*').doesNotIncludeText(oldExpensivePurchaseName);
    assert.dom('*').doesNotIncludeText(oldExpensivePurchasePrice);
    assert.dom('*').doesNotIncludeText(oldExpensivePurchasePurchaseDate);

    assert.dom('*').doesNotIncludeText(cheapPurchaseName);
    assert.dom('*').doesNotIncludeText(cheapPurchasePrice);
  });

  test('selecting a range', async function(assert) {
    const expensivePurchaseName = 'Apples';
    const expensivePurchasePrice = '135.50';
    const expensivePurchasePurchaseDate = moment().format('MM-DD-YYYY');
    const expensiveItem = this.server.create('item', { name: expensivePurchaseName });
    this.server.create('purchase',
      { item: expensiveItem,
        price: expensivePurchasePrice,
        purchaseDate: expensivePurchasePurchaseDate
      });
    const cheapPurchaseName = 'Oranges';
    const cheapPurchasePrice = '13.50';
    const cheapPurchasePurchaseDate = moment().format('MM-DD-YYYY');
    const cheapItem = this.server.create('item', { name: cheapPurchaseName });
    this.server.create('purchase',
      { item: cheapItem,
        price: cheapPurchasePrice,
        purchaseDate: cheapPurchasePurchaseDate
      });

    const randomItem = this.server.create('item', { name: 'Random' });
    this.server.create('purchase',
      { item: randomItem,
        price: '45.50',
        purchaseDate: cheapPurchasePurchaseDate
      });

    this.server.create('purchase',
      { item: randomItem,
        price: '45.50',
        purchaseDate: cheapPurchasePurchaseDate
      });

    this.server.create('purchase',
      { item: randomItem,
        price: '45.50',
        purchaseDate: cheapPurchasePurchaseDate
      });

    this.server.create('purchase',
      { item: randomItem,
        price: '45.50',
        purchaseDate: cheapPurchasePurchaseDate
      });

    const oldExpensivePurchaseName = 'Chicken';
    const oldExpensivePurchasePrice = '235.50';
    const oldExpensivePurchasePurchaseDate = moment().subtract(2, 'months').format('MM-DD-YYYY');
    const oldExpensiveItem = this.server.create('item', { name: oldExpensivePurchaseName });
    this.server.create('purchase',
      { item: oldExpensiveItem,
        price: oldExpensivePurchasePrice,
        purchaseDate: oldExpensivePurchasePurchaseDate
      });

    await visit('/purchase/expense');

    assert.dom('*').includesText(expensivePurchaseName);
    assert.dom('*').includesText(expensivePurchasePrice);
    assert.dom('*').includesText(expensivePurchasePurchaseDate);

    assert.dom('*').doesNotIncludeText(oldExpensivePurchaseName);
    assert.dom('*').doesNotIncludeText(oldExpensivePurchasePrice);
    assert.dom('*').doesNotIncludeText(oldExpensivePurchasePurchaseDate);

    assert.dom('*').doesNotIncludeText(cheapPurchaseName);
    assert.dom('*').doesNotIncludeText(cheapPurchasePrice);

    await selectChoose('.range-select', '90');

    assert.dom('*').includesText(oldExpensivePurchaseName);
    assert.dom('*').includesText(oldExpensivePurchasePrice);
    assert.dom('*').includesText(oldExpensivePurchasePurchaseDate);
  });
});
