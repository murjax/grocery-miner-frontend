import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import Route from '@ember/routing/route';
import { computed } from '@ember/object';

export default Route.extend(ApplicationRouteMixin, {
  routeAfterAuthentication: computed(function() {
    return 'home';
  })
});
