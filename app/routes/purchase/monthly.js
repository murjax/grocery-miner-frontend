import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  ajax: inject('ajax'),
  queryParams: {
    page: { refreshModel: true },
    perPage: { refreshModel: true },
    filterMonth: { refreshModel: true }
  },

  model(params) {
    params.include = 'item';
    return this.store.query(
      'purchase',
      params
    );
  }
});
