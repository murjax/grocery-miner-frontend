import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  ajax: inject('ajax'),

  model() {
    return this.store.query(
      'item',
      { page: { size: 5 }, sort: '-frequent_purchased' }
    );
  }
});
