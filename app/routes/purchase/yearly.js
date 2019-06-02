import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  ajax: inject('ajax'),
  queryParams: {
    year: { refreshModel: true },
    page: { refreshModel: true },
    perPage: { refreshModel: true },
    filterYear: { refreshModel: true }
  },

  model(params) {
    params.include = 'item';
    return this.store.query(
      'purchase',
      params
    );
  }
});
