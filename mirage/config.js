import config from '../config/environment';

export default function() {
  this.post(`${config.host}/signup`, () => true);
  this.resource('item', { path: `${config.host}/items`, only: ['index', 'show', 'create'] });
}
