import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  queryParams: ['month', 'year'],

  months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
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

  columns: [
    {
      name: 'Name',
      valuePath: 'name',
    },
    {
      name: 'Price',
      valuePath: 'price',
    },
    {
      name: 'Purchase Date',
      valuePath: 'purchase_date',
    },
  ],
});
