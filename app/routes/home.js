import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import config from '../config/environment';

export default Route.extend({
  ajax: inject('ajax'),
  session: inject('session'),
  model() {
    return this.get('ajax').request(`${config.host}/`).then(() => {
      return 'success';
    }).catch(() => {
      return 'failure';
    });
  }
});
