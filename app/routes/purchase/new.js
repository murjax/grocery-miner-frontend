import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    const items = await this.store.findAll('item');
    return { draftPurchases: [], items };
  }
});
