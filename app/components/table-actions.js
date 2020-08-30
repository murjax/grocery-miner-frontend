import Component from '@ember/component';

export default Component.extend({
  onEdit() { /* noop */ },
  onDelete() { /* noop */ },

  showEdit: true,
  showDelete: true,

  actions: {
    onEdit(row) {
      this.onEdit(row);
    },
    onDelete(row) {
      this.onDelete(row);
    }
  }
});
