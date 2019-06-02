import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  ajax: inject('ajax'),
  queryParams: {
    filterDays: { refreshModel: true },
  },

  model(params) {
    params.include = 'item';
    params.page = {
      size: 5
    }
    params.sort = '-price';
    return this.store.query(
      'purchase',
      params
    );
  }
});
