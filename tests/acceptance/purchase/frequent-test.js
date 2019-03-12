import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit } from '@ember/test-helpers';

module('Acceptance | purchase/frequent', hooks => {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('frequently purchased purchases report', async function(assert) {
    const mostFrequentName = 'Apples';
    const mostFrequentItem = this.server.create('item', { name: mostFrequentName });

    const oranges = this.server.create('item', { name: 'Oranges' });
    const bananas = this.server.create('item', { name: 'Bananas' });
    const pineapples = this.server.create('item', { name: 'Pineapples' });
    const milk = this.server.create('item', { name: 'Milk' });

    this.server.create('purchase', { item: oranges });
    this.server.create('purchase', { item: oranges });

    this.server.create('purchase', { item: mostFrequentItem });
    this.server.create('purchase', { item: mostFrequentItem });
    this.server.create('purchase', { item: mostFrequentItem });
    this.server.create('purchase', { item: mostFrequentItem });
    this.server.create('purchase', { item: mostFrequentItem });
    this.server.create('purchase', { item: mostFrequentItem });

    this.server.create('purchase', { item: bananas });
    this.server.create('purchase', { item: bananas });

    this.server.create('purchase', { item: pineapples });
    this.server.create('purchase', { item: pineapples });

    this.server.create('purchase', { item: milk });
    this.server.create('purchase', { item: milk });

    const leastFrequentName = 'Eggs';
    const leastFrequentItem = this.server.create('item', { name: leastFrequentName });
    this.server.create('purchase', { item: leastFrequentItem });

    await visit('/purchase/frequent');

    assert.dom('*').includesText(mostFrequentName);
    assert.dom('*').doesNotIncludeText(leastFrequentName);
  });

  test('empty frequent report', async function(assert) {
    await visit('/purchase/frequent');
    assert.dom('*').includesText('Name');
  });
});
