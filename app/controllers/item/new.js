import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    onSubmit() {
      const item = this.store.createRecord('item', {
        name: this.name,
        price: this.price,
        purchaseDate: this.purchaseDate,
      });
      item.save();
    }
  }
});
