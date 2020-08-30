import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  property: null,
  path: null,

  model: computed('row', function() {
    return this.row.content;
  })
});
