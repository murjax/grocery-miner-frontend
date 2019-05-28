import { underscore } from '@ember/string';
import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
  keyForAttribute(key) {
    return underscore(key);
  }
});
