import ApplicationSerializer from 'grocery-miner/mirage/serializers/application';

export default ApplicationSerializer.extend({
  serialize(model) {
    const json = ApplicationSerializer.prototype.serialize.apply(
      this, arguments
    );
    this.addTotalPrice(model, json);
    return json;
  },


  addTotalPrice(model, json) {
    if(model.models) {
      const totalPrice = model.models.reduce((accumulator, record)=> {
        return accumulator + Number.parseFloat(record.price);
      }, 0);

      json.meta.total_price = totalPrice;
    }
  }
});
