import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  ajax: inject('ajax'),
  queryParams: {
    page: { refreshModel: true },
    perPage: { refreshModel: true }
  },

  async model(params) {
    const items = await this.store.query(
      'item',
      params
    );

    return {
      items: items.toArray(),
      totalCount: items.meta.total_count,
      totalPages: items.meta.total_pages
    };
  }
});
