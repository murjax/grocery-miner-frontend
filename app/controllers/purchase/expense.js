import Controller from '@ember/controller';
import { computed } from '@ember/object';
import Table from 'ember-light-table';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.ranges = ['30', '60', '90', '365'];
    this.year = '30',
    this.columns = [
      {
        label: 'Name',
        valuePath: 'item.name',
      },
      {
        label: 'Price',
        valuePath: 'price',
      },
      {
        label: 'Purchase Date',
        valuePath: 'purchase_date',
      },
    ];
  },
  queryParams: ['range'],

  table: computed('model', function() {
    return new Table(this.get('columns'), this.get('model.purchases'));
  }),
});
