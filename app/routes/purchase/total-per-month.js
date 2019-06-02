import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import RSVP from 'rsvp';
import moment from 'moment';

export default Route.extend({
  ajax: inject('ajax'),
  queryParams: {
    filterPurchasedInMonth: { refreshModel: true }
  },

  async model(params) {
    const items = await this.store.query('item', params);
    const filterItemId = items.map(item => item.id).uniq().join(',');
    await this.store.query(
      'purchase',
      { include: 'item', filterItemId }
    );

    await RSVP.all(items.map(item => item.purchases).uniq());

    const monthDate = moment(params.filter.purchased_in_month);
    const startDate = monthDate.clone().startOf('month');
    const endDate = monthDate.clone().endOf('month');

    const model = items.map((item) => {
      const itemPurchases = item.purchases.content.filter(purchase => {
        const date = moment(purchase.purchaseDate);
        const inRange = date.isBetween(startDate, endDate, 'month', []);
        return purchase.item.get('id') === item.id && inRange;
      });
      const price = itemPurchases.reduce((accumulator, purchase) => {
        return accumulator + Number.parseFloat(purchase.price);
      }, 0);
      return {
        name: item.name,
        price,
        count: itemPurchases.length
      };
    });
    return model;
  }
});
