import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject('session'),
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
