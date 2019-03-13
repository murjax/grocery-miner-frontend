import Component from '@ember/component';

export default Component.extend({
  classNames: ['pb-3 pr-1 badge badge-primary'],
  onDelete() {},
  actions: {
    onDelete() {
      this.onDelete();
    }
  }
});
