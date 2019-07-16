'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'grocery-miner',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['ember-simple-auth-token'] = {
    refreshAccessTokens: true,
    refreshLeeway: 300 // refresh 5 minutes (300 seconds) before expiration
  };

  if (environment === 'development') {
    ENV.host = 'http://localhost:3000';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
    ENV['ember-simple-auth'] = {
      store: 'ember-simple-auth-session-store:ephemeral'
    };
    ENV.host = 'http://localhost:3000';
    ENV['ember-cli-mirage'] = {
      enabled: true
    };
  }

  if (environment === 'production') {
    ENV['ember-simple-auth'] = {
      store: 'ember-simple-auth-session-store:local-storage'
    };
  }

  return ENV;
};
