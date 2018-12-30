import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('home');
  this.route('login');
  this.route('signup');

  this.route('item', function() {
    this.route('new');
    this.route('monthly');
    this.route('yearly');
    this.route('expense');
  });
});

export default Router;
