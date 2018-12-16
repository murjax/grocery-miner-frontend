import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  name: attr('string'),
  price: attr('number'),
  purchaseDate: attr('date'),
});
