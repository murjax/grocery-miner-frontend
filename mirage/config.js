import config from '../config/environment';
import {
  itemRoutes,
  purchaseRoutes
} from 'grocery-miner/mirage/routes';

export default function() {
  [
    itemRoutes,
    purchaseRoutes
  ].forEach(routes => routes.call(this));

  this.post(`${config.host}/signup`, () => true);
}
