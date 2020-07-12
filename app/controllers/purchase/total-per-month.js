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
        valuePath: 'name',
      },
      {
        label: 'Price',
        valuePath: 'price',
        cellComponent: 'currency-formatter'
      },
      {
        label: 'Count',
        valuePath: 'count',
      },
    ];
  },
  queryParams: ['filterPurchasedInMonth'],

  filterPurchasedInMonth: computed('month', 'year', function() {
    return `${this.month}/01/${this.year}`;
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

  actions: {
    setFilterPurchasedInMonth() {
      set(this, 'filterPurchasedInMonth', `${this.month}/01/${this.year}`);
    }
  }
});
