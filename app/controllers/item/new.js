import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    onSubmit() {
      this.store.createRecord('item', {
        name: this.name,
        price: this.price,
      });
    }
  }
});
