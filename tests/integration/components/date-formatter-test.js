import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setProperties } from '@ember/object';

module('Integration | Component | date-formatter', function(hooks) {
  setupRenderingTest(hooks);

  test('it converts YYYY-MM-DD to MM/DD/YYYY', async function(assert) {
    const originalDate = '2012-03-12';
    const formattedDate = '03/12/2012';
    setProperties(this, { value: originalDate });
    await render(hbs`{{date-formatter value}}`);
    assert.dom(this.element).includesText(formattedDate);
  });
});
