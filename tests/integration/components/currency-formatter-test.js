import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setProperties } from '@ember/object';

module('Integration | Component | currency-formatter', hooks => {
  setupRenderingTest(hooks);

  test('it prepends dollar sign and comma to value', async function(assert) {
    const value = 12735.54;
    setProperties(this, { value });
    await render(hbs`{{currency-formatter value}}`);
    assert.dom(this.element).hasText('$12,735.54');
  });

  test('it does not render if value is not given', async function(assert) {
    const value = null;
    setProperties(this, { value });
    await render(hbs`{{currency-formatter value}}`);
    assert.dom(this.element).doesNotIncludeText('$');
  });
});
