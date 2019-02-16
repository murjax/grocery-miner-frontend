import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { computed as computedProperty } from '@ember/object';
import PageNumbers from 'ember-cli-pagination/components/page-numbers';
import PageItems from 'ember-cli-pagination/lib/page-items';
import layout from '../templates/components/simple-pagination';

export default PageNumbers.extend({
  tagName: 'ul',
  classNames: ['pagination'],
  layout: layout,

  pageItemsObj: computed(function() {
    return PageItems.extend({
      parent: computedProperty(() => this),
      currentPage: alias('parent.currentPage'),
      totalPages: alias('parent.totalPages'),
      truncatePages: alias('parent.truncatePages'),
      numPagesToShow: alias('parent.numPagesToShow'),
      showFL: alias('parent.showFL')
    }).create();
  }),
});
