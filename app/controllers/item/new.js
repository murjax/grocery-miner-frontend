import Controller from '@ember/controller';
import moment from 'moment';
import { inject } from '@ember/service';
import { set } from '@ember/object';
import RSVP from 'rsvp';

export default Controller.extend({
  notify: inject('notify'),

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
    setDate(selectedDate) {
      set(this, 'purchaseDate', selectedDate);
    },
    async onSubmit() {
      try {
        await RSVP.all(this.model.draftItems.map(item => item.save()));
        this.transitionToRoute('home');
      } catch(errors) {
        const errorTitles = errors.errors.mapBy('title');
        const errorMessage = errorTitles.join(', ');
        this.get('notify').error(errorMessage);
      }
    }
  }
});
