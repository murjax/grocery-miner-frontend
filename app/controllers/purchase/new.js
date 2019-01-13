import Controller from '@ember/controller';
import moment from 'moment';
import { inject } from '@ember/service';
import { set } from '@ember/object';
import { mapBy } from '@ember/object/computed';
import RSVP from 'rsvp';

export default Controller.extend({
  notify: inject('notify'),

  items: mapBy('model.items', 'name'),

  actions: {
    searchAsync(term) {
      set(this, 'name', term);
      return this.items.filter(item => {
        return item.toLowerCase().includes(term.toLowerCase())
      });
    },
    async addPurchase() {
      const item = (this.items.includes(this.name)) ?
        this.model.items.findBy('name', this.name) :
        await this.store.createRecord('item', { name: this.name });

      if (item.hasDirtyAttributes) {
        await item.save();
      }

      const purchase = this.store.createRecord('purchase', {
        item,
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
    setPrice(price) {
      set(this, 'price', price);
    },
    async onSubmit() {
      try {
        await RSVP.all(this.model.draftPurchases.map(purchase => {
          purchase.save();
        }));
        this.transitionToRoute('home');
      } catch(errors) {
        const errorTitles = errors.errors.mapBy('title');
        const errorMessage = errorTitles.join(', ');
        this.get('notify').error(errorMessage);
      }
    }
  }
});
