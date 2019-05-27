import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';
export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host: `${config.host}`,
  authorize(xhr) {
    let { token } = this.get('session.data.authenticated');
    let authData = `Bearer ${token}`;
    xhr.setRequestHeader('Authorization', authData);
  }
});
