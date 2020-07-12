import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  ajax: inject('ajax'),
  queryParams: {
    page: { refreshModel: true },
    perPage: { refreshModel: true }
  },

  async model(params) {
    const carts = await this.store.query(
      'cart',
      params
    );
    const cart = await this.store.findRecord('cart', params.id);
    const cartItems = await this.store.query('cart-item', { filterCartId: params.id, include: 'item' });
    const itemIds = cartItems.map((cartItem) => cartItem.item.get('id'));

    let items = [];

    if (itemIds.length > 0) {
      items = await this.store.query('item', { filterId: itemIds.join(',') });
    }

    const allItems = await this.store.findAll('item');

    return {
      carts: carts.toArray(),
      cart,
      cartItems: cartItems.toArray(),
      items: items.toArray(),
      allItems,
      totalCount: carts.meta.total_count,
      totalPages: carts.meta.total_pages
    };
  }
});
