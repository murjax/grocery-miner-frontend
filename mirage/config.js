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

    if (queryParams['filter[item_id]']) {
      const itemIds = queryParams['filter[item_id]'].split(',');
      const newCollections = itemIds.map(itemId => {
        return collection.filter(purchase => purchase.itemId === itemId);
      });
      const newCollection = newCollections.shift();
      newCollections.forEach(remainingCollection => {
        newCollection.mergeCollection(remainingCollection);
        });
      collection = newCollection;
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

    if (queryParams['filter[purchased_in_month]']) {
      const monthDate = moment(queryParams['filter[purchased_in_month]']);
      const startDate = monthDate.clone().startOf('month');
      const endDate = monthDate.clone().endOf('month');

      collection = collection.filter(item => {
        const monthPurchases = purchases.where({ itemId: item.id }).filter(purchase => {
          const date = moment(purchase.purchaseDate);
          return date.isBetween(startDate, endDate, 'month', []);
        });
        return monthPurchases.length > 0;
      });
    }

    if (queryParams.sort === '-frequent_purchased') {
      collection = collection.sort((a, b) => {
        const firstPurchaseCount = purchases.where({ itemId: a.id }).length;
        const secondPurchaseCount = purchases.where({ itemId: b.id }).length;

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
}
