import Controller from '@ember/controller';
import { computed } from '@ember/object';
import Table from 'ember-light-table';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.ranges = ['30', '60', '90', '365'];
    this.columns = [
      {
        label: 'Name',
        valuePath: 'item.name',
      },
      {
        label: 'Price',
        valuePath: 'price',
        cellComponent: 'currency-formatter'
      },
      {
        label: 'Purchase Date',
        valuePath: 'purchaseDate',
        cellComponent: 'date-formatter'
      },
    ];
  },
  queryParams: ['filterDays'],

  filterDays: '30',

  table: computed('model', function() {
    return new Table(this.get('columns'), this.get('model'));
  }),
});
