import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import config from '../../config/environment';

export default Route.extend({
  ajax: inject('ajax'),
  queryParams: {
    month: { refreshModel: true },
    year: { refreshModel: true },
    page: { refreshModel: true },
    perPage: { refreshModel: true },
  },

  model(params) {
    return this.get('ajax').request(`${config.host}/purchases/monthly`, {
      data: {
        month: params.month,
        year: params.year,
        page: params.page,
        perPage: params.perPage
      }
    }).then((response) => {
      return response;
    }).catch(() => {
      return [];
    });
  }
});
