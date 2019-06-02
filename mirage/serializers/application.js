import { JSONAPISerializer } from 'ember-cli-mirage';
import { underscore } from '@ember/string';
import { pluralize } from 'ember-inflector';

export default JSONAPISerializer.extend({
  perPageDefault: 25,

  serialize(model, request) {
    const json = JSONAPISerializer.prototype.serialize.apply(
      this, arguments
    );
    this.addMeta(model, request, json);
    this.paginate(model, request, json);
    return json;
  },

  addMeta(model, request, json) {
    if (model.models) {
      const pageParams = this.paginationParams(request);
      json.meta = {
        total_pages: Math.ceil(
          model.models.length / pageParams.size
        ),
        total_count: model.models.length
      };
    } else if (model.meta) {
      json.meta = model.meta;
    }
    return json;
  },

  paginate(model, request, json) {
    if (model.models) {
      const pageParams = this.paginationParams(request);
      const page = pageParams.number;
      const perPage = pageParams.size;
      json.data = json.data.slice(perPage * (page - 1), perPage * page);
    }
    return json;
  },

  paginationParams({ queryParams }) {
    const pageParams = {
      number: 0, size: 0
    };
    pageParams.number = parseInt(queryParams['page[number]'] || '1', 10);
    pageParams.size = parseInt(
      queryParams['page[size]'] || String(this.perPageDefault), 10
    );
    return pageParams;
  },

  keyForModel(modelName) {
    return pluralize(underscore(modelName));
  },

  keyForCollection(modelName) {
    return pluralize(underscore(modelName));
  },

  keyForAttribute(attr) {
    return underscore(attr);
  },

  keyForRelationship(modelName) {
    return underscore(modelName);
  },

  keyForEmbeddedRelationship(modelName) {
    return underscore(modelName);
  },

  keyForRelationshipIds(modelName) {
    return underscore(modelName);
  },

  typeKeyForModel(model) {
    return underscore(model.modelName);
  }
});
