import Controller from '@ember/controller';
import moment from 'moment';

export default Controller.extend({
  actions: {
    addItem() {
      const item = this.store.createRecord('item', {
        name: this.name,
        price: this.price,
        purchaseDate: (moment(this.purchaseDate).format('YYYY-MM-DD'))
      });
      this.model.draftItems.pushObject(item);
    },
    deleteItem(item) {
      this.model.draftItems.removeObject(item);
      item.deleteRecord();
    },
    onSubmit() {
      const item = this.store.createRecord('item', {
        name: this.name,
        price: this.price,
        purchaseDate: (moment(this.purchaseDate).format('YYYY-MM-DD'))
      });
      item.save().then(() => this.transitionToRoute('home'));
    }
  }
});
