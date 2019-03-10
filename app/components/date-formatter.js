import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
  tagName: '',

  formattedDate: computed('value', function() {
    return moment(this.value).format('MM/DD/YYYY');
  })
}).reopenClass({
  positionalParams: ['value']
});
