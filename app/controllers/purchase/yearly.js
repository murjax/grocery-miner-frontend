import Controller from '@ember/controller';
import { computed } from '@ember/object';
import Table from 'ember-light-table';

export default Controller.extend({
  init() {
    this._super(...arguments);
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
        valuePath: 'purchase_date',
      },
    ];
  },
  queryParams: ['year', 'page', 'perPage'],

  page: 1,
  perPage: 25,

  totalPages: computed('model', function() {
    return this.model.meta.total_pages;
  }),

  table: computed('model', function() {
    return new Table(this.get('columns'), this.get('model.purchases'));
  }),

  years: computed(function() {
    const currentYear = new Date().getFullYear();
    var startYear = 1995;
    const years = [];

    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    return years;
  }),

  year: computed(function() {
    return new Date().getFullYear();
  }),

  total: computed('model', function() {
    return this.model.meta.total_price;
  })
});
