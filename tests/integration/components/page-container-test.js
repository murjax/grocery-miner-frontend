import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | page-container', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{page-container}}`);

    assert.equal(this.element.textContent.trim(), '');

    await render(hbs`
      {{#page-container}}
        template block text
      {{/page-container}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
