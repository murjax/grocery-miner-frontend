import { computed, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import PageNumbers from '../components/page-numbers';

export default PageNumbers.extend({
  tagName: 'ul',
  classNames: ['pagination'],

  totalPages: computed('pagination', function() {
    return this.pages || 0;
  }),

  currentPage: alias('page'),
  isVisible: alias('hasPages'),

  onChange() { /* noop */ },

  actions: {
    pageClicked(page) {
      set(this, 'page', page);
      this.onChange(page);
    },

    incrementPage(page) {
      const currentPage = Number(this.page);
      const totalPages = Number(this.totalPages);

      if (currentPage === totalPages && page === 1) {
        return false;
      }
      if (currentPage <= 1 && page === -1) {
        return false;
      }
      this.incrementProperty('currentPage', page);
      this.onChange(this.page);
      return true;
    }
  }
});
