import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit } from '@ember/test-helpers';

module('Acceptance | purchase/frequent', hooks => {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('frequently purchased purchases report', async function(assert) {
    const mostFrequentName = 'Apples';

    this.server.create('purchase', { name: 'Oranges' });
    this.server.create('purchase', { name: 'Oranges' });

    this.server.create('purchase', { name: mostFrequentName });
    this.server.create('purchase', { name: mostFrequentName });
    this.server.create('purchase', { name: mostFrequentName });
    this.server.create('purchase', { name: mostFrequentName });
    this.server.create('purchase', { name: mostFrequentName });
    this.server.create('purchase', { name: mostFrequentName });

    this.server.create('purchase', { name: 'Bananas' });
    this.server.create('purchase', { name: 'Bananas' });

    this.server.create('purchase', { name: 'Pineapples' });
    this.server.create('purchase', { name: 'Pineapples' });

    this.server.create('purchase', { name: 'Milk' });
    this.server.create('purchase', { name: 'Milk' });

    const leastFrequentName = 'Eggs';
    this.server.create('purchase', { name: leastFrequentName });

    await visit('/purchase/frequent');

    assert.dom('*').includesText(mostFrequentName);
    assert.dom('*').doesNotIncludeText(leastFrequentName);
  });
});
