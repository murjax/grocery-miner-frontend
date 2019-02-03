import Controller from '@ember/controller';
import { computed } from '@ember/object';
import Table from 'ember-light-table';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.columns = [
      {
        label: 'Name',
        valuePath: 'name',
      },
    ];
  },

  table: computed('model', function() {
    return new Table(this.get('columns'), this.get('model'));
  }),
});
