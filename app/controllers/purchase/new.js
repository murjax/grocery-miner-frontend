import Controller from '@ember/controller';
import moment from 'moment';
import { inject } from '@ember/service';
import { set } from '@ember/object';
import RSVP from 'rsvp';

export default Controller.extend({
  notify: inject('notify'),

  actions: {
    addPurchase() {
      const purchase = this.store.createRecord('purchase', {
        name: this.name,
        price: this.price,
        purchaseDate: (moment(this.purchaseDate).format('YYYY-MM-DD'))
      });
      this.model.draftPurchases.pushObject(purchase);
    },
    deletePurchase(purchase) {
      this.model.draftPurchases.removeObject(purchase);
      purchase.deleteRecord();
    },
    setDate(selectedDate) {
      set(this, 'purchaseDate', selectedDate);
    },
    async onSubmit() {
      try {
        await RSVP.all(this.model.draftPurchases.map(purchase => purchase.save()));
        this.transitionToRoute('home');
      } catch(errors) {
        const errorTitles = errors.errors.mapBy('title');
        const errorMessage = errorTitles.join(', ');
        this.get('notify').error(errorMessage);
      }
    }
  }
});
