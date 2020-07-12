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

    return {
      carts: carts.toArray(),
      totalCount: carts.meta.total_count,
      totalPages: carts.meta.total_pages
    };
  }
});
