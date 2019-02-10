import ApplicationSerializer from 'grocery-miner/mirage/serializers/application';

export default ApplicationSerializer.extend({
  embed: true,
  // eslint-disable-next-line
  include: ['item']
});
