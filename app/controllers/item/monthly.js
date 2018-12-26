import Controller from '@ember/controller';

export default Controller.extend({
  columns: [
    {
      name: 'Name',
      valuePath: 'name',
    },
    {
      name: 'Price',
      valuePath: 'price',
    },
    {
      name: 'Purchase Date',
      valuePath: 'purchase_date',
    },
  ],
});
