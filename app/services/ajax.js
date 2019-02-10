import AjaxService from 'ember-ajax/services/ajax';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default AjaxService.extend({
  session: inject('session'),
  trustedHosts: computed(function() {
    return ['localhost', 'grocery-miner-api.herokuapp.com'];
  }),
  headers: computed('session.data.authenticated', {
    get() {
      let token = this.get('session.data.authenticated').token;
      let authData = `Bearer ${token}`;
      let headers = {};
      headers['Authorization'] = authData;
      headers['Content-Type'] = 'application/json';
      return headers;
    }
  })
});
