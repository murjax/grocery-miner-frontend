import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import config from '../config/environment';
import { Promise } from 'rsvp';
import { isEmpty } from '@ember/utils';
import { run } from '@ember/runloop';
const { $: { ajax } } = Ember;
export default Base.extend({
  tokenEndpoint: `${config.host}/login`,
  restore(data) {
    return new Promise((resolve, reject) => {
      if (!isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },
  authenticate(creds) {
    const { email, password } = creds;
    const data = JSON.stringify({
      user: {
        email,
        password
      }
    });
    const requestOptions = {
      url: this.tokenEndpoint,
      type: 'POST',
      data,
      contentType: 'application/json',
      dataType: 'json'
    };
    return new Promise((resolve, reject) => {
      ajax(requestOptions).then((_data, _textStatus, xhr) => {
        const jwt = xhr.getResponseHeader('authorization');
        // Wrapping aync operation in Ember.run
        run(() => {
          resolve({
            token: jwt
          });
        });
      }, (error) => {
        // Wrapping aync operation in Ember.run
        run(() => {
          reject(error);
        });
      });
    });
  },
  invalidate(data) {
    return Promise.resolve(data);
  }
});
