import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import config from '../config/environment';

export default AjaxService.extend({
  session: Ember.inject.service(),
  trustedHosts: ['localhost'],
  headers: Ember.computed('session.data.authenticated', {
    get() {
      let { email, token } = this.get('session.data.authenticated');
      let authData = `Bearer ${token}`;
      let headers = {};
      headers['Authorization'] = authData;
      headers['Content-Type'] = 'application/json';
      return headers;
    }
  })
});
