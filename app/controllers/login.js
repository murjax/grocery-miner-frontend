import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject('session'),

  actions: {
    authenticate() {
      const credentials = this.getProperties('username', 'password');
      const authenticator = 'authenticator:jwt';
      this.get('session').authenticate(authenticator, credentials);
    }
  },
});
