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

  newItem: null,
  selectedItem: null,
  showNewModal: false,
  showEditModal: false,

  totalCount: computed('model.totalCount', function() {
    return this.model.totalCount;
  }),

  actions: {
    async onCreate() {
      try {
        await this.newItem.save();
        this.model.items.pushObject(this.newItem);
        setProperties(this, {
          newItem: undefined,
          showNewModal: false
        });
      } catch(errors) {
        const errorTitles = errors.errors.mapBy('title');
        const errorMessage = errorTitles.join(', ');
        this.get('notify').error(errorMessage);
      }
    },
    createItem() {
      const newItem = this.store.createRecord('item');
      setProperties(this, {
        newItem,
        showNewModal: true
      });
    },
    async onUpdate() {
      try {
        await this.selectedItem.save();
        setProperties(this, {
          selectedItem: undefined,
          showEditModal: false
        });
      } catch(errors) {
        const errorTitles = errors.errors.mapBy('title');
        const errorMessage = errorTitles.join(', ');
        this.get('notify').error(errorMessage);
      }
    },
    async editItem(row) {
      const selectedItem = await this.store.findRecord('item', row.get('id'));
      setProperties(this, {
        selectedItem: selectedItem,
        showEditModal: true
      });
    },
    async deleteItem(row) {
      const selectedItem = await this.store.findRecord('item', row.get('id'));

      try {
        this.model.items.removeObject(selectedItem);
        await selectedItem.deleteRecord();
        this.get('notify').success('The record was successfully deleted');
      } catch (errors) {
        const errorTitles = errors.errors.mapBy('title');
        const errorMessage = errorTitles.join(', ');
        this.get('notify').error(errorMessage);
      }
    }
  }
});
