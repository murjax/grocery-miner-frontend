import Controller from '@ember/controller';
import moment from 'moment';
import { set } from '@ember/object';

export default Controller.extend({
  draftItems: [],
  reload() {
    // this.get('model.draftItems').forEach(function(record) {
    //   record.reload();
    // });
  },

  actions: {
    addItem() {
      const item = this.store.createRecord('item', {
        name: this.name,
        price: this.price,
        purchaseDate: (moment(this.purchaseDate).format('YYYY-MM-DD'))
      });
      this.draftItems.pushObject(item);
      this.model.draftItems.pushObject(item);
      // set(this, 'model.draftItems', this.draftItems);
      this.reload();
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
