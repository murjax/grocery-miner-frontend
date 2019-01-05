import config from '../config/environment';
import moment from 'moment';

export default function() {
  this.post(`${config.host}/signup`, () => true);
  this.resource('purchase', { path: `${config.host}/purchases`, only: ['index', 'show', 'create'] });
  this.resource('item', { path: `${config.host}/items`, only: ['index', 'show', 'create'] });

  this.get(`${config.host}/purchases/monthly`, function() {
    const month = this.request.queryParams.month;
    const year = this.request.queryParams.year;
    const startDate = moment(`${month}/01/${year}`);
    const endDate = startDate.clone().endOf('month');
    return this.schema.purchases.all().filter(purchase => {
      const purchaseDate = moment(purchase.purchaseDate);
      return purchaseDate.isBetween(startDate, endDate);
    });
  });

  this.get(`${config.host}/purchases/yearly`, function() {
    const year = this.request.queryParams.year;
    const startDate = moment(`01/01/${year}`);
    const endDate = startDate.clone().endOf('year');
    return this.schema.purchases.all().filter(purchase => {
      const purchaseDate = moment(purchase.purchaseDate);
      return purchaseDate.isBetween(startDate, endDate);
    });
  });

  this.get(`${config.host}/purchases/expense`, function() {
    const range = this.request.queryParams.range || '30';
    const dateLimit = moment().subtract(range, 'days');

    var purchases = this.schema.purchases.all().filter(purchase => {
      const purchaseDate = moment(purchase.purchaseDate);
      return purchaseDate.isSameOrAfter(dateLimit);
    });

    return purchases.sort(function(a, b) {
      return b.price - a.price;
    }).slice(0, 5);
  });

  this.get(`${config.host}/purchases/frequent`, function() {
    var purchases = this.schema.purchases.all();

    const purchaseNames = purchases.models.map(purchase => {
      return { name: purchase.item.attrs.name, count: this.schema.purchases.where({ item: purchase.item }).length };
    }).sort(function(a, b) {
      return b.count - a.count;
    }).map(purchase => purchase.name).uniq().slice(0, 5);

    return { names: purchaseNames };
  });

  this.get(`${config.host}/purchases/total_per_month`, function() {
    const month = this.request.queryParams.month;
    const year = this.request.queryParams.year;
    const startDate = moment(`${month}/01/${year}`);
    const endDate = startDate.clone().endOf('month');

    const purchases = this.schema.purchases.all().filter(purchase => {
      const purchaseDate = moment(purchase.purchaseDate);
      return purchaseDate.isBetween(startDate, endDate);
    });

    const purchasePrices = purchases.models.map(purchase => {
      const sharedNamePurchases = purchases.models.filter(shared => shared.name == purchase.name);
      const total = sharedNamePurchases.reduce(function(a, b) { return a + parseFloat(b.price) }, 0);
      return { name: purchase.name, price: total };
    }).uniqBy('name');
    purchasePrices;

    return { purchases: purchasePrices };
  });
}
