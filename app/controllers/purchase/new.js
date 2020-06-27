import Controller from '@ember/controller';
import moment from 'moment';
import { inject } from '@ember/service';
import { set } from '@ember/object';
import { mapBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Controller.extend({
  session: service(),
  notify: inject('notify'),

  items: mapBy('model.items', 'name'),
  purchaseDate: moment().format('MM-DD-YYYY'),

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

      var itemValid = true;

      if (item.hasDirtyAttributes) {
        try {
          await item.save();
        } catch(errors) {
          const errorTitles = errors.errors.mapBy('title');
          const errorMessage = errorTitles.join(', ');
          itemValid = false;
          this.get('notify').error(errorMessage);
        }
      }

      if (itemValid) {
        const purchase = this.store.createRecord('purchase', {
          item,
          price: this.price,
          purchaseDate: (moment(this.purchaseDate).format('YYYY-MM-DD'))
        });
        set(this, 'name', null);
        set(this, 'price', null);
        this.model.draftPurchases.pushObject(purchase);
      }
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
        this.transitionToRoute('purchase.monthly');
      } catch(errors) {
        const errorTitles = errors.errors.mapBy('title');
        const errorMessage = errorTitles.join(', ');
        this.get('notify').error(errorMessage);
      }
    }
  }
});
