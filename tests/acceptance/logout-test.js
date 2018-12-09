import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  visit, click
} from '@ember/test-helpers';
import { currentSession, authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | logout', hooks => {
  setupApplicationTest(hooks);

  test('logout button invalidates user session', async function(assert) {
    await authenticateSession();
    await visit('/home');
    assert.equal(currentSession().isAuthenticated, true);
    await click('.logout');
    assert.equal(currentSession().isAuthenticated, false);
  });
});
