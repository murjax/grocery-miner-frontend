import config from '../config/environment';

export default function() {
  this.post(`${config.host}/signup`, () => true);
}
