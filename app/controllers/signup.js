import Controller from '@ember/controller';
import { inject } from '@ember/service';
import config from '../config/environment';
import { isPresent } from '@ember/utils';

export default Controller.extend({
  session: inject('session'),
  ajax: inject('ajax'),

  actions: {
    submit(){
      const credentials = this.getProperties('email', 'password');
      if (isPresent(credentials.email) && isPresent(credentials.password)) {
        return this.get('ajax').post(`${config.host}/signup`, {
          data: {
            user: {
              email: credentials.email,
              password: credentials.password
            }
          }
        }).then(() => {
          const authenticator = 'authenticator:jwt';
          this.get('session').authenticate(authenticator, credentials);
        }).catch(reason => {
          this.set('errorMessage', reason.error || reason);
        });
      } else {
        this.set('errorMessage', 'Email and password are required');
      }
    }
  }
});
