import { underscore } from '@ember/string';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';
export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host: `${config.host}`,
  authorize(xhr) {
    let { token } = this.get('session.data.authenticated');
    let authData = `Bearer ${token}`;
    xhr.setRequestHeader('Authorization', authData);
  },

  sortQueryParams(query) {
    query = this._super(query)
    if (query) {
      this.sanitizeKeys(query);
    }
    return query;
  },

  sanitizeKeys(query) {
    Object.keys(query).forEach((key) => {
      this.convertKey(query, key);
    });
    return query;
  },

  convertKey(query, key) {
    const reserved = 'filter';
    let updatedKey;

    if (key.startsWith(reserved) && key !== reserved) {
      if (!query[reserved]) {
        query[reserved] = {};
      }

      updatedKey = key.slice(reserved.length, key.length);
      updatedKey = underscore(updatedKey);

      query[reserved][updatedKey] = query[key];
      delete query[key];
    } else {
      updatedKey = underscore(key);

      if (updatedKey !== key) {
        query[updatedKey] = query[key];
        delete query[key];
      }
    }

    return query;
  }
});
