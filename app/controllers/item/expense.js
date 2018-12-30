import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.ranges = ['30', '60', '90', '365'];
    this.year = '30',
    this.columns = [
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
    ];
  },
  queryParams: ['range'],
});
