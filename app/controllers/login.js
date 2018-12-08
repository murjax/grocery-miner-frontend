import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { isPresent } from '@ember/utils';

export default Controller.extend({
  session: inject('session'),

  actions: {
    authenticate() {
      const credentials = this.getProperties('email', 'password');
      if (isPresent(credentials.email) && isPresent(credentials.password)) {
        const authenticator = 'authenticator:jwt';
        this.get('session').authenticate(authenticator, credentials);
      } else {
        this.set('errorMessage', 'Email and password are required');
      }
    }
  },
});
