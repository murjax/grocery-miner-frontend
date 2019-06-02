import { assert } from '@ember/debug';
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
      this.sanitizeSort(query);
    }
    return query;
  },

  sanitizeKeys(query) {
    Object.keys(query).forEach((key) => {
      this.convertKey(query, key);
    });
    return query;
  },

  sanitizeSort(query) {
    if (query.sort) {
      assert('query.sort should be string', typeof query.sort === 'string');
      let { sort } = query;
      sort = sort.replace(/(^-|(,)-)/g, '$2{dash}');
      sort = underscore(sort);
      sort = sort.replace(/\{dash\}/g, '-');
      query.sort = sort;
    }
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
