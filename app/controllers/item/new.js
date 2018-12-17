import Controller from '@ember/controller';
import moment from 'moment';

export default Controller.extend({
  actions: {
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
