import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import config from '../../config/environment';

export default Route.extend({
  ajax: inject('ajax'),

  model() {
    return this.get('ajax').request(`${config.host}/purchases/frequent`)
    .then((response) => {
      return response.names.map(name => {
        return { name };
      });
    }).catch(() => {
      return [];
    });
  }
});
