import Component from '@ember/component';
import { computed } from '@ember/object';
import Table from 'ember-light-table';

export default Component.extend({
  records: null,
  columns: null,

  table: computed('records.[]', function() {
    return new Table(this.columns, this.records);
  }),
});
