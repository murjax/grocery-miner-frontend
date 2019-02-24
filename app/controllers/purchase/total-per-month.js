import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';
import Table from 'ember-light-table';

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
    ];
  },
  queryParams: ['month', 'year'],

  table: computed('model', function() {
    return new Table(this.get('columns'), this.get('model'));
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
});
