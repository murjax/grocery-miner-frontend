import Controller from '@ember/controller';
import { set } from '@ember/object';
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

  newItem: null,

  actions: {
    async addItem() {
      if (!this.newItem) {
        return;
      }

      try {
        const cartItem = this.store.createRecord(
          'cart-item',
          {
            cart: this.model.cart,
            item: this.newItem
          }
        );
        cartItem.save();
        this.model.cartItems.pushObject(cartItem);
        this.model.items.pushObject(this.newItem);
        set(this, 'newItem', null);
      } catch(errors) {
        const errorTitles = errors.errors.mapBy('title');
        const errorMessage = errorTitles.join(', ');
        this.get('notify').error(errorMessage);
      }
    },
    async deleteItem(row) {
      const selectedItem = await this.store.findRecord('item', row.get('id'));
      const cartItems = await this.store.query('cart-item', { filterItemId: selectedItem.get('id') });
      const selectedCartItem = cartItems.firstObject;

      try {
        this.model.items.removeObject(selectedItem);
        this.model.cartItems.removeObject(selectedCartItem);
        await selectedCartItem.destroyRecord();
        this.get('notify').success('The item was successfully deleted');
      } catch (errors) {
        const errorTitles = errors.errors.mapBy('title');
        const errorMessage = errorTitles.join(', ');
        this.get('notify').error(errorMessage);
      }
    }
  }
});
