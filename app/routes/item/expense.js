import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import config from '../../config/environment';

export default Route.extend({
  ajax: inject('ajax'),
  queryParams: {
    range: { refreshModel: true },
  },

  model(params) {
    return this.get('ajax').request(`${config.host}/items/expense`, {
      data: { range: params.range }
    }).then((response) => {
      return response;
    }).catch(() => {
      return [];
    });
  }
});
