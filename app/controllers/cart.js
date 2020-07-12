import Controller from '@ember/controller';
import { computed, setProperties } from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.columns = [
      {
        label: 'Name',
        valuePath: 'name',
      }
    ];
  },

  notify: inject('notify'),

  queryParams: ['page', 'perPage'],

  page: 1,
  perPage: 25,

  newCart: null,
  selectedCart: null,
  showNewModal: false,
  showEditModal: false,

  totalCount: computed('model.totalCount', function() {
    return this.model.totalCount;
  }),

  actions: {
    async onCreate() {
      try {
        await this.newCart.save();
        this.model.carts.pushObject(this.newCart);
        setProperties(this, {
          newCart: undefined,
          showNewModal: false
        });
      } catch(errors) {
        const errorTitles = errors.errors.mapBy('title');
        const errorMessage = errorTitles.join(', ');
        this.get('notify').error(errorMessage);
      }
    },
    createCart() {
      const newCart = this.store.createRecord('cart');
      setProperties(this, {
        newCart,
        showNewModal: true
      });
    },
    async onUpdate() {
      try {
        await this.selectedCart.save();
        setProperties(this, {
          selectedCart: undefined,
          showEditModal: false
        });
      } catch(errors) {
        const errorTitles = errors.errors.mapBy('title');
        const errorMessage = errorTitles.join(', ');
        this.get('notify').error(errorMessage);
      }
    },
    async editCart(row) {
      const selectedCart = await this.store.findRecord('cart', row.get('id'));
      setProperties(this, {
        selectedCart: selectedCart,
        showEditModal: true
      });
    },
    async deleteCart(row) {
      const selectedCart = await this.store.findRecord('cart', row.get('id'));

      try {
        this.model.carts.removeObject(selectedCart);
        await selectedCart.deleteRecord();
        this.get('notify').success('The record was successfully deleted');
      } catch (errors) {
        const errorTitles = errors.errors.mapBy('title');
        const errorMessage = errorTitles.join(', ');
        this.get('notify').error(errorMessage);
      }
    }
  }
});
