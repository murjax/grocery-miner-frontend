import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import config from '../../config/environment';

export default Route.extend({
  ajax: inject('ajax'),

  model(params) {
    return this.get('ajax').request(`${config.host}/items/monthly`).then((response) => {
    return response;
    }).catch((error) => {
      return [];
    });
  }
});
