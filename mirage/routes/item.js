import config from '../../config/environment';
import moment from 'moment';

export default function itemRoutes() {
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
