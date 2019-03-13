import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | auth-box', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{auth-box}}`);

    assert.equal(this.element.textContent.trim(), '');

    await render(hbs`
      {{#auth-box}}
        template block text
      {{/auth-box}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
