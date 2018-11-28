import ActiveModelAdapter from 'active-model-adapter';
import TokenAuthorizerMixin from 'ember-simple-auth-token/mixins/token-authorizer';
import config from '../config/environment';
export default ActiveModelAdapter.extend(TokenAuthorizerMixin, {
  host: `${config.host}`,
  authorizer: 'authorizer:custom'
});
