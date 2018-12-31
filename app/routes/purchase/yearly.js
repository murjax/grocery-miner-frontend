import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import config from '../../config/environment';

export default Route.extend({
  ajax: inject('ajax'),
  queryParams: {
    year: { refreshModel: true }
  },

  model(params) {
    return this.get('ajax').request(`${config.host}/purchases/yearly`, {
      data: { year: params.year }
    }).then((response) => {
      return response;
    }).catch(() => {
      return [];
    });
  }
});
