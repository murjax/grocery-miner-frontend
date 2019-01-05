import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.columns = [
      {
        name: 'Name',
        valuePath: 'item.name',
      },
      {
        name: 'Price',
        valuePath: 'price',
      },
      {
        name: 'Purchase Date',
        valuePath: 'purchase_date',
      },
    ];
  },
  queryParams: ['year'],

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
});
