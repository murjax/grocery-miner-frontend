import { ActiveModelSerializer } from 'ember-cli-mirage';
import { pluralize } from 'ember-inflector';
import { underscore } from '@ember/string';
import { Collection } from 'ember-cli-mirage';

export default ActiveModelSerializer.extend({
  serialize(model, request) {
    const json = ActiveModelSerializer.prototype.serialize.apply(
      this, arguments
    );
    this.paginate(model, request, json);
    return json;
  },
  paginate(model, request, json) {
    if (model instanceof Collection && request.queryParams.page) {
      const page = parseInt(request.queryParams.page || 1),
        perPage = parseInt(request.queryParams.per_page || request.queryParams.perPage),
        type = pluralize(underscore(model.modelName));
      const totalPages = Math.ceil(json[type].length / perPage);
      json[type] = json[type].slice(perPage * (page - 1), perPage * page);
      json.meta = { total_pages: totalPages };
    }
    return json;
  }
});
