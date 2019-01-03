import EmbeddedRecordsMixin from 'ember-data/serializers/embedded-records-mixin';
import { ActiveModelSerializer } from 'active-model-adapter';

export default ActiveModelSerializer.extend(EmbeddedRecordsMixin, {
  attrs: {
    item: { serialize: 'id', deserialize: 'records' }
  }
});
