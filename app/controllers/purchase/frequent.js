import Controller from '@ember/controller';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.columns = [
      {
        label: 'Name',
        valuePath: 'name',
      },
    ];
  }
});
