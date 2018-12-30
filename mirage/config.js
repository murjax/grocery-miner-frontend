import config from '../config/environment';
import moment from 'moment';

export default function() {
  this.post(`${config.host}/signup`, () => true);
  this.resource('item', { path: `${config.host}/items`, only: ['index', 'show', 'create'] });

  this.get(`${config.host}/items/monthly`, function() {
    const month = this.request.queryParams.month;
    const year = this.request.queryParams.year;
    const startDate = moment(`${month}/01/${year}`);
    const endDate = startDate.clone().endOf('month');
    return this.schema.items.all().filter(item => {
      const purchaseDate = moment(item.purchaseDate);
      return purchaseDate.isBetween(startDate, endDate);
    });
  });

  this.get(`${config.host}/items/yearly`, function() {
    const year = this.request.queryParams.year;
    const startDate = moment(`01/01/${year}`);
    const endDate = startDate.clone().endOf('year');
    return this.schema.items.all().filter(item => {
      const purchaseDate = moment(item.purchaseDate);
      return purchaseDate.isBetween(startDate, endDate);
    });
  });

  this.get(`${config.host}/items/expense`, function() {
    const range = this.request.queryParams.range || '30';
    const dateLimit = moment().subtract(range, 'days');

    var items = this.schema.items.all().filter(item => {
      const purchaseDate = moment(item.purchaseDate);
      return purchaseDate.isSameOrAfter(dateLimit);
    });

    return items.sort(function(a, b) {
      return b.price - a.price;
    }).slice(0, 5);
  });

  this.get(`${config.host}/items/frequent`, function() {
    var items = this.schema.items.all();

    const itemNames = items.models.map(item => {
      return { name: item.name, count: this.schema.items.where({ name: item.name }).length };
    }).sort(function(a, b) {
      return b.count - a.count;
    }).map(item => item.name).uniq().slice(0, 5);

    return { names: itemNames };
  });
}
