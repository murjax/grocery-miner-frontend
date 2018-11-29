import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import config from '../config/environment';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Route.extend(AuthenticatedRouteMixin, {
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
