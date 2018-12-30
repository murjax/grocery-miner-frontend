import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit } from '@ember/test-helpers';

module('Acceptance | item/frequent', hooks => {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('frequently purchased items report', async function(assert) {
    const mostFrequentName = 'Apples';

    this.server.create('item', { name: 'Oranges' });
    this.server.create('item', { name: 'Oranges' });

    this.server.create('item', { name: mostFrequentName });
    this.server.create('item', { name: mostFrequentName });
    this.server.create('item', { name: mostFrequentName });
    this.server.create('item', { name: mostFrequentName });
    this.server.create('item', { name: mostFrequentName });
    this.server.create('item', { name: mostFrequentName });

    this.server.create('item', { name: 'Bananas' });
    this.server.create('item', { name: 'Bananas' });

    this.server.create('item', { name: 'Pineapples' });
    this.server.create('item', { name: 'Pineapples' });

    this.server.create('item', { name: 'Milk' });
    this.server.create('item', { name: 'Milk' });

    const leastFrequentName = 'Eggs';
    this.server.create('item', { name: leastFrequentName });

    await visit('/item/frequent');

    assert.dom('*').includesText(mostFrequentName);
    assert.dom('*').doesNotIncludeText(leastFrequentName);
  });
});
