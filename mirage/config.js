import config from '../config/environment';
import moment from 'moment';

export default function() {
  this.post(`${config.host}/signup`, () => true);
  this.resource('purchase', { path: `${config.host}/purchases`, only: ['show', 'create'] });

  this.get(`${config.host}/purchases`, ({ purchases }, { queryParams }) => {
    let collection = purchases.all();

    if (queryParams['filter[month]']) {
      const monthDate = moment(queryParams['filter[month]']);
      const startDate = monthDate.clone().startOf('month');
      const endDate = monthDate.clone().endOf('month');
      collection = collection.filter(purchase => {
        const date = moment(purchase.purchaseDate);
        return date.isBetween(startDate, endDate, 'month', []);
      });
    }

    if (queryParams['filter[year]']) {
      const yearDate = moment(queryParams['filter[year]']);
      const startDate = yearDate.clone().startOf('year');
      const endDate = yearDate.clone().endOf('year');
      collection = collection.filter(purchase => {
        const date = moment(purchase.purchaseDate);
        return date.isBetween(startDate, endDate, 'year', []);
      });
    }

    if (queryParams['filter[days]']) {
      const dateLimit = moment().subtract(queryParams['filter[days]'], 'days');
      collection = collection.filter(purchase => {
        const date = moment(purchase.purchaseDate);
        return date.isSameOrAfter(dateLimit);
      });
    }

    if (queryParams.sort === '-price') {
      collection = collection.sort((a, b) => {
        if (a.price < b.price) {
          return 1;
        }

        if (a.price > b.price) {
          return -1;
        }
        return 0;
      });
    }

    return collection;
  });


  this.resource('item', { path: `${config.host}/items`, only: ['index', 'show', 'create'] });

  this.get(`${config.host}/items`, ({ items, purchases }, { queryParams }) => {
    let collection = items.all();

    if (queryParams.sort === '-frequent_purchased') {
      collection = collection.sort((a, b) => {
        const firstPurchaseCount = purchases.where({ item: a }).length;
        const secondPurchaseCount = purchases.where({ item: b }).length;

        if (firstPurchaseCount < secondPurchaseCount) {
          return 1;
        }

        if (firstPurchaseCount > secondPurchaseCount) {
          return -1;
        }
        return 0;

      });
    }
    return collection;
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
      const sharedItemPurchases = purchases.models.filter(shared => {
        return shared.item.attrs.id == purchase.item.attrs.id;
      });
      const total = sharedItemPurchases.reduce(function(a, b) { return a + parseFloat(b.price) }, 0);
      return { name: purchase.item.attrs.name, price: total, count: sharedItemPurchases.length };
    }).uniqBy('name');
    purchasePrices;

    return { purchases: purchasePrices };
  });
}
