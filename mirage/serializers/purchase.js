import ApplicationSerializer from 'grocery-miner/mirage/serializers/application';

export default ApplicationSerializer.extend({
  embed: true,
  // eslint-disable-next-line
  include: ['item'],

  serialize(model) {
    const json = ApplicationSerializer.prototype.serialize.apply(
      this, arguments
    );
    json.meta.total_price = model.models.reduce(
      (acc, purchase) =>
      { return acc + parseFloat(purchase.price) }, 0);
    return json;
  }
});
