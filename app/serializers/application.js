import { underscore } from '@ember/string';
import { computed } from '@ember/object';
import { pluralize } from 'ember-inflector';
import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
  typeMap: computed('', function() {
    const map = {};
    return this.modelNameResolutions.reduce((acc, resolution) => {
      acc[resolution.type] = resolution.modelName;
      return acc;
    }, map);
  }),

  keyForAttribute(key) {
    return underscore(key);
  },

  payloadTypeFromModelName(modelName) {
    return this.payloadKeyFromModelName(modelName);
  },

  payloadKeyFromModelName(modelName) {
    return pluralize(underscore(modelName));
  }
});
