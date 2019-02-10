import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { setProperties } from '@ember/object';
import {
  visit, click, fillIn
} from '@ember/test-helpers';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | signup', hooks => {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('filling user signup form triggers authentication', async function(assert) {
    const sessionService = this.owner.lookup('service:session');
    setProperties(sessionService, {
      authenticate() {
        assert.ok(true);
      }
    });
    await visit('/signup');
    await fillIn('#email input', 'foo@bar.com');
    await fillIn('#password input', 'password');
    await click('.submit');
  });

  test('submitting empty form results in error', async function(assert) {
    await visit('/login');
    await click('.submit');
    assert.dom('.errors').includesText('Email and password are required');
  });
});
