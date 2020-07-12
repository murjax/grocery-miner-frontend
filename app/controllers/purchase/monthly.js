import Controller from '@ember/controller';
import { computed, set } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
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
  queryParams: ['filterMonth', 'page', 'perPage'],

  page: 1,
  perPage: 25,

  filterMonth: computed('month', 'year', function() {
    return `${this.month}/01/${this.year}`;
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

  month: computed(function() {
    return moment().format('MM');
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
    setFilterMonth() {
      set(this, 'filterMonth', `${this.month}/01/${this.year}`);
    }
  }
});
