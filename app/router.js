import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('login');
  this.route('signup');

  this.route('purchase', function() {
    this.route('new');
    this.route('monthly');
    this.route('yearly');
    this.route('expense');
    this.route('frequent');
    this.route('total-per-month');
  });
  this.route('item');
  this.route('cart');
});

export default Router;
