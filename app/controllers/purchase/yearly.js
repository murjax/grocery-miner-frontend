import Controller from '@ember/controller';
import { computed, set } from '@ember/object';

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
        valuePath: 'purchaseDate',
        cellComponent: 'date-formatter'
      },
    ];
  },
  queryParams: ['filterYear', 'page', 'perPage'],

  page: 1,
  perPage: 25,

  filterYear: computed('year', function() {
    return `01/01/${this.year}`;
  }),

  totalPages: computed('model', function() {
    return this.model.meta.total_pages;
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
  }),

  totalCount: computed('model', function() {
    return this.model.meta.total_count;
  }),

  actions: {
    setFilterYear() {
      set(this, 'filterYear', `01/01/${this.year}`);
    }
  }
});
