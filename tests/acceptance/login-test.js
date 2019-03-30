import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { setProperties } from '@ember/object';
import {
  visit, currentURL, click, fillIn
} from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | login', hooks => {
  setupApplicationTest(hooks);

  test('filling user login form triggers authentication', async function(assert) {
    const sessionService = this.owner.lookup('service:session');
    setProperties(sessionService, {
      authenticate() {
        assert.ok(true);
      }
    });
    await visit('/login');
    await fillIn('#email input', 'foo@bar.com');
    await fillIn('#password input', 'password');
    await click('.submit');
  });

  test('authenticated user can visit authenticated only routes', async function(assert) {
    await visit('/home');
    assert.equal(currentURL(), '/login');
    await authenticateSession();
    assert.equal(currentURL(), '/home');
  });

  test('submitting empty form results in error', async function(assert) {
    await visit('/login');
    await click('.submit');
    assert.dom('.auth-box').includesText('Email and password are required');
  });
});
